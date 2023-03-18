import { objectType } from "nexus";

export const CardTypeDefs = objectType({
  name: "Card",
  definition(t) {
    t.string("id");
    t.string("ind");
    t.string("classId");
    t.string("topicId");
    t.string("userId");
    t.string("name");
    t.string("description");
    t.string("level");
    t.string("category");
    t.boolean("sample");
    t.boolean("def");
    t.field("_count", { type: "Count" });
    t.field("Dashboard", {
      type: "Dashboard",
      resolve(par) {
        return par;
      },
    });

    // fronts
    t.list.field("fronts", {
      type: "Field",
      resolve(par, arg, ctx) {
        return ctx.prisma.field.findMany({
          where: { frontId: par.id },
        });
      },
    });
    // backs

    t.list.field("backs", {
      type: "Field",
      resolve(par, arg, ctx) {
        return ctx.prisma.field.findMany({
          where: { backId: par.id },
        });
      },
    });
  },
});
