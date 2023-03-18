import { objectType } from "nexus";

export const Topic = objectType({
  name: "Topic",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("classId");
    t.string("description");
    t.string("userId");
    t.string("folderId");
    t.string("templateId");
    t.boolean("sample");

    t.field("template", {
      type: "Template",
      resolve(par: any, arg, ctx) {
        return par?.Template;
      },
    });

    // cards
    t.list.field("cards", {
      type: "Card",
      resolve(par, arg, ctx) {
        return ctx.prisma.card.findMany({
          where: { topicId: par.id },
        });
      },
    });
  },
});
