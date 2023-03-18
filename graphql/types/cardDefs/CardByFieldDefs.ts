import { extendType, nonNull, stringArg } from "nexus";

export const CardsByFieldDefs = extendType({
  type: "Query",
  definition(t) {
    t.list.field("cardsByField", {
      type: "Card",
      args: {
        classId: nonNull(stringArg()),
        field: nonNull(stringArg()),
        value: nonNull(stringArg()),
      },
      async resolve(par_, { field, value, classId }, ctx) {
        const cards = await ctx.prisma.card.findMany({
          where: { [field]: value, classId },
          orderBy: { createdAt: "asc" },
        });
        return cards;
      },
    });
  },
});
