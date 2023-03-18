import { extendType, nonNull, stringArg } from "nexus";
import { ContextType } from "../../context";

export const TopicsByFolderId = extendType({
  type: "Query",
  definition(t) {
    t.list.field("topicsByFolders", {
      type: "Topic",
      args: { folderId: nonNull(stringArg()) },
      resolve(par_, where, ctx: ContextType) {
        return ctx.prisma.topic.findMany({
          where,
          include: {
            Template: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        });
      },
    });
  },
});
