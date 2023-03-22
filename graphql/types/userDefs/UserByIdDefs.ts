import { extendType, nonNull, stringArg } from "nexus";

export const UserByIdDefs = extendType({
  type: "Query",
  definition(t) {
    t.field("user", {
      type: "User",
      args: {
        userId: stringArg(),
      },
      resolve(par_, { userId }, ctx) {
        return ctx.prisma.user.findFirst({
          where: { id: userId },
        });
      },
    });
  },
});
