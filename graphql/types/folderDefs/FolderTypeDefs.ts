import { objectType } from "nexus";

export const FolderTypeDefs = objectType({
  name: "Folder",
  definition(t) {
    t.string("id");
    t.string("name");
    t.boolean("sample");
    t.string("classId");
    t.string("userId");

    // folder's class
    t.field("class", {
      type: "Class",
      resolve(par, arg, ctx) {
        const id: any = par.classId;
        return ctx.prisma.folder.findFirst({
          where: { id },
        });
      },
    });

    // folder's topics
    t.list.field("topics", {
      type: "Topic",
      resolve(par, arg, ctx) {
        return ctx.prisma.topic.findMany({
          where: { folderId: par.id },
        });
      },
    });
  },
});
