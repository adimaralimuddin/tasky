import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import { _unsuccessfulResponse } from "../../../lib/utils/utilsDb/_dbResponse";

export const ClassDeleterDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteClass", {
      type: "Class",
      args: { classId: nonNull(stringArg()) },
      async resolve(par, { classId }, ctx) {
        const { prisma, req, res } = ctx;

        const user = getSession(req, res)?.user;

        // ---------------------------------
        // handle unauthenticated request
        if (!user) {
          return _unsuccessfulResponse({
            isSuccess: false,
            type: "Validate",
            path: "classDeleterDefs line:22",
            msg: "you are not authenticated to delete this class",
          });
        }

        // --------------------------------
        // handle authorization
        const isMyOwnClass = await prisma.class.findFirst({
          where: { id: classId, userId: user.sub },
        });

        if (!isMyOwnClass) {
          return _unsuccessfulResponse({
            isSuccess: false,
            type: "Validate",
            path: "classDeleterDefs line:37",
            msg: "you can't delete other user's class.",
          });
        }

        // *********************
        // finally delete class

        const deletedClassResult = await ctx.prisma.class.deleteMany({
          where: { id: classId, sample: false },
        });

        console.log(`deleted class results: `, deletedClassResult);
        return deletedClassResult?.count !== 0 ? { id: classId } : null;
      },
    });
  },
});
