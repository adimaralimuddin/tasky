import { extendType, nonNull, stringArg } from "nexus";

export const ClassById = extendType({
  type: "Query",
  definition(t) {
    t.field("class", {
      type: "Class",
      args: { id: nonNull(stringArg()) },
      resolve(par, where, ctx) {
        return ctx.prisma.class.findFirst({
          where,
        });
      },
    });
  },
});
