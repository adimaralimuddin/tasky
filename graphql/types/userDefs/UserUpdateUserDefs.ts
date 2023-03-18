import { extendType, nonNull, stringArg } from "nexus";

export const UserUpdateUserDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateUser", {
      type: "User",
      args: { id: nonNull(stringArg()), name: nonNull(stringArg()) },
      resolve(par, { id, name }, { prisma }) {
        return prisma.user.update({ where: { id }, data: { name } });
      },
    });
  },
});
