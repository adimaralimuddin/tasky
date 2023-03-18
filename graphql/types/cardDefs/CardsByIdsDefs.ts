import { extendType, list, stringArg } from "nexus";

export const CardByIdsDefs = extendType({
  type: "Query",
  definition(t) {
    t.list.field("cardsByIds", {
      type: "Card",
      args: { ids: list(stringArg()) },
      async resolve(par_, args, ctx) {
        const topics = await ctx.prisma.card.findMany({
          where: { id: { in: args?.ids } },
          orderBy: { createdAt: "asc" },
        });
        return topics;
      },
    });
  },
});
