import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import { DEF_USERID } from "../../../lib/public";
import _dbGetSampleClass from "../../../lib/utils/utilsDb/_dbGetSampleClass";
import { ContextType } from "../../context";

export const cardDeleterDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteCard", {
      type: "Card",
      args: {
        userId: stringArg(),
        cardId: nonNull(stringArg()),
        classId: nonNull(stringArg()),
      },
      async resolve(par_, args, ctx: ContextType) {
        const { prisma, req, res } = ctx;
        const { cardId, classId } = args;
        try {
          const user = getSession(req, res)?.user;
          const isSampleClass = await _dbGetSampleClass(classId);

          if (!user) {
            if (!isSampleClass) {
              console.log(`Validate:
                    @cardDeleterDefs
                    msg: not authenticated and not sample class`);
              return null;
            }
            args.userId = DEF_USERID;
          }

          if (user) {
            const isMyCard = await prisma.card.findFirst({
              where: { id: cardId, userId: args.userId },
            });
            if (!isMyCard && !isSampleClass) {
              console.log(`Validate:
              @cardDeleterDefs
              msg: not owns card and not sample card`);
              return null;
            }
          }

          const deletedCards = await prisma.card.deleteMany({
            where: {
              id: cardId,
              sample: false,
            },
          });

          return deletedCards?.count != 0 ? { id: cardId } : null;
        } catch (error) {
          console.log(
            `Error:
            @cardDeleterDefs
            msg: `,
            error
          );

          return null;
        }
      },
    });
  },
});
