import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import { _unsuccessfulResponse } from "../../../lib/utils/utilsDb/_dbResponse";

export const ClasUpdaterDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateClass", {
      type: "Class",
      args: {
        classId: nonNull(stringArg()),
        name: stringArg(),
        description: stringArg(),
      },
      async resolve(par, { classId, ...cardsDataWithoutClassId }, ctx) {
        const { prisma, req, res } = ctx;
        const user = getSession(req, res)?.user;

        // ----------------------------
        // handle unauthenticated request
        if (!user) {
          return _unsuccessfulResponse({
            type: "Validate",
            isSuccess: false,
            path: "classUpdaterDefs",
            msg: "you are not authenticated to updated this class",
          });
        }

        // -------------------------
        // handle authorization
        const isMyOwnClass = await prisma.class.findFirst({
          where: { id: classId, userId: user.sub },
        });

        if (!isMyOwnClass) {
          return _unsuccessfulResponse({
            type: "Validate",
            isSuccess: false,
            path: "classUpdaterDefs",
            msg: "you are not allowed to updated other user's class",
          });
        }

        // *******************************
        // finally update class
        const updatedCardResults = await ctx.prisma.class.updateMany({
          where: { id: classId, sample: false },
          data: cardsDataWithoutClassId,
        });

        console.log(`updated card result: `, updatedCardResults);

        return updatedCardResults?.count !== 0
          ? { id: classId, ...cardsDataWithoutClassId }
          : null;
      },
    });
  },
});
