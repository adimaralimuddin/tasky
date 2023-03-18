import { extendType, intArg, list, nonNull, stringArg } from "nexus";

export const DashboardStatAdderDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addStat", {
      type: "Stats",
      args: {
        time: nonNull(stringArg()),
        classId: nonNull(stringArg()),
        easy: nonNull(intArg()),
        normal: nonNull(intArg()),
        hard: nonNull(intArg()),
        easyCards: list(stringArg()),
        normalCards: list(stringArg()),
        hardCards: list(stringArg()),
      },
      async resolve(par_, args, ctx) {
        const { time, classId } = args;
        try {
          const existingStats = await ctx.prisma.stats.findFirst({
            where: { time, classId },
          });

          if (existingStats) {
            const { classId, time, ...statsData } = args;
            const updatedStat = await ctx.prisma.stats.update({
              where: { classId_time: { classId, time } },
              data: { ...statsData, time },
            });

            return updatedStat;
          } else {
            const result = await ctx.prisma.stats.create({
              data: {
                ...args,
              },
            });

            return result;
          }
        } catch (error) {
          console.log(`Error: state: mutation > addStat = `, error);

          return null;
        }
      },
    });
  },
});
