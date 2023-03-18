import { extendType, nonNull, stringArg } from "nexus";

export const UserClasses = extendType({
  type: "Query",
  definition(t) {
    t.list.field("userClasses", {
      type: "Class",
      args: { userId: nonNull(stringArg()) },
      resolve(par, { userId }, ctx) {
        return ctx.prisma.class.findMany({ where: { userId, sample: false } });
      },
    });
  },
});
