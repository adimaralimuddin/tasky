import { getSession } from "@auth0/nextjs-auth0";
import {
  arg,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  stringArg,
} from "nexus";
import { DEF_USERID, SAMPLE } from "../../../lib/public";
import _dbGetSampleClass from "../../../lib/utils/utilsDb/_dbGetSampleClass";

export const cardAdderDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addCard", {
      type: "Card",
      args: {
        id: nonNull(stringArg()),
        ind: nonNull(intArg()),
        classId: nonNull(stringArg()),
        userId: stringArg(),
        topicId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        description: stringArg(),
        level: stringArg({ default: "hard" }),
        category: stringArg({ default: "new" }),
        fronts: list(arg({ type: FieldInputType })),
        backs: list(arg({ type: FieldInputType })),
      },
      async resolve(par, args, { req, res, prisma }) {
        try {
          const { fronts, backs, ...otherCardData } = args;
          const user = getSession(req, res)?.user;
          const isSampleClass = await _dbGetSampleClass(args.classId);

          if (!user) {
            if (!isSampleClass) {
              console.log(`Validate:
                      cardAdderDefs
                      msg: not authenticated and not sample class.`);
              return null;
            }
            otherCardData.userId = DEF_USERID;
          }

          if (user) {
            const isMyClass = await prisma.class.findFirst({
              where: { id: args.classId, userId: user.sub },
            });

            if (!isMyClass && !isSampleClass) {
              console.log(`
                    Validate:
                    @cardAdderDefs
                    msg: not owns class and not sample class`);
              return null;
            }
          }

          const cardCounts = await prisma.card.findMany({
            where: { topicId: args.topicId },
          });

          if (cardCounts?.length >= 20) {
            return null;
          }

          const ret = await prisma.card.create({
            data: {
              ...otherCardData,
              sample: SAMPLE,
              fronts: { create: args.fronts },
              backs: { create: args.backs },
            },
          });

          return ret;
        } catch (error) {
          console.log(
            `Error:
            @cardAdderDefs
            msg: `,
            error
          );
        }
      },
    });
  },
});

export const FieldInputType = inputObjectType({
  name: "CommentInputType",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.int("ind");
    t.nonNull.string("viewId");
    t.nonNull.string("text");
    t.nonNull.string("value");
    t.nonNull.string("type");
  },
});
