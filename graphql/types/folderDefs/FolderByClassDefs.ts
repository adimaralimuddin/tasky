import { extendType, nonNull, stringArg } from "nexus";
import { ContextType } from "../../context";

export const FolderQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("foldersByClass", {
      type: "Folder",
      args: { classId: nonNull(stringArg()) },
      resolve(par_, where, ctx: ContextType) {
        return ctx.prisma.folder.findMany({
          where,
          orderBy: {
            createdAt: "asc",
          },
        });
      },
    });
  },
});
