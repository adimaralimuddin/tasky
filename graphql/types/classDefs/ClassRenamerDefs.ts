import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import { _unsuccessfulResponse } from "../../../lib/utils/utilsDb/_dbResponse";
import { ContextType } from "../../context";

export const ClassRenamer = extendType({
  type: "Mutation",
  definition(t) {
    t.field("renameClass", {
      type: "Class",
      args: {
        classId: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(par, args, ctx: ContextType) {
        const { classId, name } = args;
        const { prisma, req, res } = ctx;

        const user = getSession(req, res)?.user;

        // ------------------------------
        // handle unauthenticated request
        if (!user) {
          return _unsuccessfulResponse({
            isSuccess: false,
            type: "Validate",
            path: "classRenamerDefs line:26",
            msg: "unauthenticated user will not be able to rename a class.",
          });
        }

        // --------------------------------
        // handle authorization
        const currentClass = await prisma.class.findFirst({
          where: { id: classId, userId: user.sub },
        });

        if (!currentClass) {
          return _unsuccessfulResponse({
            isSuccess: false,
            type: "Validate",
            path: "classRenamerDefs line:42",
            msg: "you are not allowed to rename this class, this class is not yours.",
          });
        }

        // *****************************
        // finally rename a class
        const renamedClassResults = await ctx.prisma.class.updateMany({
          where: { id: classId, sample: false },
          data: { name },
        });

        console.log(`renamed class result: `, renamedClassResults);

        return renamedClassResults?.count !== 0 ? { id: classId, name } : null;
      },
    });
  },
});
