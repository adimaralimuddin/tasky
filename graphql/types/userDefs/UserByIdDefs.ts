import { extendType, nonNull, stringArg } from "nexus";

export const UserByIdDefs = extendType({
  type: "Query",
  definition(t) {
    t.field("user", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
      },
      resolve(par, { id }, ctx) {
        return ctx.prisma.user.findFirst({
          where: { id },
        });
      },
    });
  },
});
