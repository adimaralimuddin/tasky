import { extendType, nonNull, stringArg } from "nexus";

export const UserCreateUserDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      resolve(par, data, ctx) {
        return ctx.prisma.user.create({
          data,
        });
      },
    });
  },
});
