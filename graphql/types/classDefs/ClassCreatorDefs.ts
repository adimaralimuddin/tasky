import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import { ClassLimit, SAMPLE } from "../../../lib/public";
import { _unsuccessfulResponse } from "../../../lib/utils/utilsDb/_dbResponse";
import { ContextType } from "../../context";

export const CreateClass = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createClass", {
      type: "Class",
      args: {
        id: nonNull(stringArg()),
        userId: stringArg(),
        name: nonNull(stringArg()),
        description: stringArg(),
      },
      async resolve(par, data, ctx: ContextType) {
        const { req, res, prisma } = ctx;

        const user = getSession(req, res)?.user;

        // if user and class count is less than class limits then allow create
        // if no user, not allowed to create

        // ------------------------
        // handle unauthorized request
        if (!user) {
          return _unsuccessfulResponse({
            type: "Validate",
            isSuccess: false,
            path: "classCreatorDefs, line:29",
            msg: "unauthrozed user will not able to create class.",
          });
        }

        // ----------------------------
        // handle entity limits
        const classCount = await ctx.prisma.class.count({
          where: { userId: data.userId },
        });

        if (classCount > ClassLimit)
          return _unsuccessfulResponse({
            type: "Validate",
            isSuccess: false,
            path: "classCreatorDefs, line:46",
            msg:
              "you have reach maximum limit of " +
              ClassLimit +
              " to create class",
          });

        // ********************************
        // finally create class
        const createdClass = await ctx.prisma.class.create({
          data: {
            ...data,
            sample: SAMPLE,
          },
        });

        console.log(`class created successfully: `, createdClass?.id);

        return createdClass;
      },
    });
  },
});
