import { objectType } from "nexus";

export const UserTypeDefs = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("dbid");
    t.string("name");
    t.string("email");
    t.list.field("class", {
      type: "Class",
      resolve(par, _arg, ctx) {
        return ctx.prisma.class.findMany({
          where: {
            userId: par.id,
          },
        });
      },
    });
  },
});
