import { extendType, nonNull, stringArg } from "nexus";
import { ContextType } from "../../context";

export const TopicByUserIdDefs = extendType({
  type: "Query",
  definition(t) {
    t.list.field("userTopic", {
      type: "Topic",
      args: { userId: nonNull(stringArg()) },
      resolve(par_, { userId }, ctx: ContextType) {
        return ctx.prisma.topic.findMany({
          where: { userId },
          select: {
            id: true,
            name: true,
          },
          orderBy: { createdAt: "asc" },
        });
      },
    });
  },
});
