import { extendType, nonNull, stringArg } from "nexus";

export const DashboardStatByClassIdDefs = extendType({
  type: "Query",
  definition(t) {
    t.list.field("stats", {
      type: "Stats",
      args: {
        classId: nonNull(stringArg()),
      },
      async resolve(par_, { classId }, ctx) {
        const stats = await ctx.prisma.stats.findMany({
          where: { classId },
          orderBy: { time: "desc" },
          take: 10,
        });

        return stats;
      },
    }); // stats
  },
});
