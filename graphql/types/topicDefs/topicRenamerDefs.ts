import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import _dbGetSampleClass from "../../../lib/utils/utilsDb/_dbGetSampleClass";
import { ContextType } from "../../context";

export const topicRenamerDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("renameTopic", {
      type: "Topic",
      args: {
        userId: stringArg(),
        topicId: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(
        par,
        { userId, topicId, name },
        { req, res, prisma }: ContextType
      ) {
        const user = getSession(req, res)?.user;

        const topicTopRename = await prisma.topic.findUnique({
          where: { id: topicId },
        });
        // const isSampleClass = _dbGetSampleClass(classId);

        // ------------------------------------
        // handle unauthorized request
        if (!user) {

        }

        

        const result = await prisma.topic.updateMany({
          where: { id: topicId, sample: false, userId },
          data: { name },
        });
        return result?.count != 0 ? { id: topicId, name, userId } : null;
      },
    });
  },
});
