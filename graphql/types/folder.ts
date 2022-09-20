import { extendType, nonNull, objectType, stringArg } from "nexus";
import { Class } from "./class";
import { Topic } from "./topic";

export const Folder = objectType({
  name: "Folder",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("classId");

    // folder's class
    t.field("class", {
      type: Class,
      resolve(par, arg, ctx) {
        return ctx.prisma.folder.findFirst({
          where: { id: par.classId },
        });
      },
    });

    // folder's topics
    t.list.field("topics", {
      type: Topic,
      resolve(par, arg, ctx) {
        return ctx.prisma.topic.findMany({
          where: { folderId: par.id },
        });
      },
    });
  },
});

export const FolderQuery = extendType({
  type: "Query",
  definition(t) {
    t.list.field("foldersByClass", {
      type: Folder,
      args: { classId: nonNull(stringArg()) },
      resolve(par, { classId }, ctx) {
        return ctx.prisma.folder.findMany({
          where: { classId },
        });
      },
    });
  },
});

export const FolderMutation = extendType({
  type: "Mutation",
  definition(t) {
    // create folder
    t.field("createFolder", {
      type: Folder,
      args: {
        // userId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        classId: nonNull(stringArg()),
      },
      resolve(par, data, ctx) {
        return ctx.prisma.folder.create({ data });
      },
    });

    //delete folder
    t.field("deleteFolder", {
      type: Folder,
      args: { id: nonNull(stringArg()) },
      resolve(par, { id }, ctx) {
        return ctx.prisma.folder.delete({
          where: { id },
        });
      },
    });

    // rename folder
    t.field("renameFolder", {
      type: Folder,
      args: { folderId: nonNull(stringArg()), name: nonNull(stringArg()) },
      resolve(par, { folderId, name }, ctx) {
        return ctx.prisma.folder.update({
          where: { id: folderId },
          data: { name },
        });
      },
    });
  },
});
