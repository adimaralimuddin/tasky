import { objectType } from "nexus";

export const ClassTypeDefs = objectType({
  name: "Class",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("userId");
    t.string("description");
    t.boolean("sample");
    t.list.field("folders", {
      type: "Folder",
      resolve(par, arg, ctx) {
        return ctx.prisma.folder.findMany({
          where: { classId: par.id },
        });
      },
    });
  },
});
