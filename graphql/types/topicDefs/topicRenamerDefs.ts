import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import _dbGetSampleClass from "../../../lib/utils/utilsDb/_dbGetSampleClass";
import { _unsuccessfulResponse } from "../../../lib/utils/utilsDb/_dbResponse";
import { ContextType } from "../../context";

export const topicRenamerDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("renameTopic", {
      type: "Topic",
      args: {
        userId: stringArg(),
        topicId: nonNull(stringArg()),
        classId: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(par_, args, ctx: ContextType) {
        const { userId, topicId, name, classId } = args;
        const { req, res, prisma } = ctx;
        console.log(`args s`, args);

        const user = getSession(req, res)?.user;
        const isSampleClass = await _dbGetSampleClass(classId);

        if (!user && !isSampleClass) {
          return _unsuccessfulResponse({
            type: "Validate",
            path: "topicRenamerDefs/handleUnAuthenticatedRequest",
            isSuccess: false,
            msg: "you are not authenticated and this topic is not on a sample class.",
          });
        }

        if (user) {
          const currentTopic = await prisma.topic.findUnique({
            where: { id: topicId },
          });
          if (!currentTopic && !isSampleClass) {
            return _unsuccessfulResponse({
              type: "Validate",
              path: "topicRenamerDefs/handleAuthenticatedRequest",
              isSuccess: false,
              msg: "you are not authorized to rename other's classes, and this topic is not on a sample class.",
            });
          }
        }

        const result = await prisma.topic.updateMany({
          where: { id: topicId },
          data: { name },
        });
        console.log(`result`, result);

        return result?.count != 0 ? { id: topicId, name, userId } : null;
      },
    });
  },
});
