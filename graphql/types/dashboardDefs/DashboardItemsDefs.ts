import { extendType, nonNull, stringArg } from "nexus";

export const DashboardItemsDefs = extendType({
  type: "Query",
  definition(t) {
    t.list.field("dashboard", {
      type: "Card",
      args: { classId: nonNull(stringArg()) },
      resolve(par, { classId }, ctx) {
        return ctx.prisma.card.groupBy({
          by: ["level", "category"],
          where: {
            Topic: {
              folder: {
                classId,
              },
            },
          },
          _count: {
            id: true,
          },
        });
      },
    });
  },
});
