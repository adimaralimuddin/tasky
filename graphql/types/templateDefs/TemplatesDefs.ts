import { extendType, nonNull, stringArg } from "nexus";

export const TemplatesDefs = extendType({
  type: "Query",
  definition(t) {
    t.list.field("templates", {
      type: "Template",
      args: { userId: nonNull(stringArg()) },
      resolve(par_, { userId }, ctx) {
        return ctx.prisma.template.findMany({
          where: { userId, deleted: false },
          orderBy: { createdAt: "asc" },
        });
      },
    });
  },
});
