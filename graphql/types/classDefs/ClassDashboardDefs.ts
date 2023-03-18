import { extendType, nonNull, stringArg } from "nexus";

export const ClassDashboardDefs = extendType({
  type: "Query",
  definition(t) {
    t.field("classDashboard", {
      type: "Class",
      args: { id: nonNull(stringArg()) },
      resolve(par_, { id }, ctx) {
        return ctx.prisma.class.findUnique({
          where: { id },
          include: {
            folders: {
              include: {
                topic: {
                  include: {
                    cards: true,
                  },
                },
              },
            },
          },
        });
      },
    });
  },
});
