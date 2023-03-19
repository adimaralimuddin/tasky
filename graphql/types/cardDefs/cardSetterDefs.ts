import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import { DEF_USERID } from "../../../lib/public";
import _dbGetSampleClass from "../../../lib/utils/utilsDb/_dbGetSampleClass";
import { ContextType } from "../../context";

export const cardSetterDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("setCardLevel", {
      type: "Card",
      args: {
        cardId: nonNull(stringArg()),
        level: stringArg(),
        userId: stringArg(),
        classId: nonNull(stringArg()),
      },
      async resolve(par, args, ctx) {
        const { prisma, req, res } = ctx;
        const { cardId, level, classId } = args;

        try {
          const user = getSession(req, res)?.user;
          const isSampleClass = await _dbGetSampleClass(classId);

          if (!user) {
            if (!isSampleClass) {
              console.log(`Validate:
            @cardSetterDefs/setCardLevel
            msg: not authenticated and not a sample class.`);
              return null;
            }
            args.userId = DEF_USERID;
          }

          if (user) {
            const isMyCard = await prisma.card.findFirst({
              where: { id: String(cardId), userId: user.sub },
            });
            if (!isMyCard && !isSampleClass) {
              console.log(`validate:
            @cardSetterDefs/setCard
            msg: not owned card and not a sample class.`);
              return null;
            }
          }

          const updatedCardLevel = await prisma.card.update({
            where: { id: cardId },
            data: { level, category: level == "easy" ? "passed" : "left" },
          });
          return updatedCardLevel;
        } catch (error) {
          console.log(
            `Error:
          @cardSetterDefs/setCardlevel
          msg: `,
            error
          );

          return null;
        }
      },
    });
  },
});
