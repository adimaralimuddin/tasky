import { extendType, nonNull, stringArg } from "nexus";

export const CardByIdTopicIdDefs = extendType({
  type: "Query",
  definition(t) {
    t.list.field("cardsByTopic", {
      type: "Card",
      args: { topicId: nonNull(stringArg()) },
      resolve(par, { topicId }, ctx) {
        return ctx.prisma.card.findMany({
          where: { topicId },
          orderBy: { createdAt: "asc" },
        });
      },
    });
  },
});
