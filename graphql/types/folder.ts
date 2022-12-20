import { extendType, nonNull, objectType, stringArg } from "nexus";
import { SAMPLE } from "../../lib/public";
import { Class } from "./class";
import { Topic } from "./topic";

export const Folder = objectType({
  name: "Folder",
  definition(t) {
    t.string("id");
    t.string("name");
    t.boolean("sample");
    t.string("classId");

    // folder's class
    t.field("class", {
      type: Class,
      resolve(par, arg, ctx) {
        const id: any = par.classId;
        return ctx.prisma.folder.findFirst({
          where: { id },
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
        name: nonNull(stringArg()),
        classId: nonNull(stringArg()),
      },
      resolve(par, data, ctx) {
        return ctx.prisma.folder.create({ data: { ...data, sample: SAMPLE } });
      },
    });

    //delete folder
    t.field("deleteFolder", {
      type: Folder,
      args: { id: nonNull(stringArg()) },
      async resolve(par, { id }, ctx) {
        const res = await ctx.prisma.folder.deleteMany({
          where: { id, sample: false },
        });
        return res?.count !== 0 ? { id } : null;
      },
    });

    // rename folder
    t.field("renameFolder", {
      type: Folder,
      args: { folderId: nonNull(stringArg()), name: nonNull(stringArg()) },
      async resolve(par, { folderId, name }, ctx) {
        const res: any = await ctx.prisma.folder.updateMany({
          where: { id: folderId, sample: false },
          data: { name },
        });
        return res?.count !== 0 ? { id: folderId, name } : null;
      },
    });
  },
});
