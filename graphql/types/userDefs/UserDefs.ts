import { extendType } from "nexus";

export const UserDefs = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("users", {
      type: "User",
      resolve(par, arg, ctx) {
        return ctx.prisma.user.findMany();
      },
    });
  },
});
