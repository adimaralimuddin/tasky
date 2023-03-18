import { extendType, nonNull, stringArg } from "nexus";

export const UserByDbIdDefs = extendType({
  type: "Query",
  definition(t) {
    t.field("userByDbid", {
      type: "User",
      args: { id: nonNull(stringArg()) },
      resolve(par, { id }, ctx) {
        console.log(`ards dbid: =`, id);
        return ctx.prisma.user.findFirst({
          where: { id },
        });
      },
    });
  },
});
