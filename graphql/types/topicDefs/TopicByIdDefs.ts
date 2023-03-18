import { extendType, nonNull, stringArg } from "nexus";

export const TopicById = extendType({
  type: "Query",
  definition(t) {
    t.field("topic", {
      type: "Topic",
      args: { topicId: nonNull(stringArg()) },
      resolve(par, { topicId }, ctx) {
        return ctx.prisma.topic.findFirst({
          where: { id: topicId },
        });
      },
    });
  },
});
