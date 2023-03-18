import { extendType, nonNull, stringArg } from "nexus";

export const UserDeleteUserDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteUser", {
      type: "User",
      args: { id: nonNull(stringArg()) },
      resolve(par, { id }, ctx) {
        return ctx.prisma.user.delete({
          where: { id },
        });
      },
    });
  },
});
