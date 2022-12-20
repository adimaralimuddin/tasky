import { extendType, nonNull, objectType, stringArg } from "nexus";
import { SAMPLE } from "../../lib/public";
import { Folder } from "./folder";

export const Class = objectType({
  name: "Class",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("userId");
    t.string("description");
    t.boolean("sample");
    t.list.field("folders", {
      type: Folder,
      resolve(par, arg, ctx) {
        return ctx.prisma.folder.findMany({
          where: { classId: par.id },
        });
      },
    });
  },
});

export const ClassQuery = extendType({
  type: "Query",

  definition(t) {
    // get all sample classes
    t.list.field("sampleClasses", {
      type: Class,
      resolve(par_, arg_, ctx) {
        return ctx.prisma.class.findMany({
          where: { sample: true },
        });
      },
    });

    // get all classes
    t.nonNull.list.field("classes", {
      type: "Class",
      resolve(par_, arg_, ctx) {
        return ctx.prisma.class.findMany({ where: { sample: false } });
      },
    });

    // Get user class
    t.list.field("userClasses", {
      type: "Class",
      args: { userId: nonNull(stringArg()) },
      resolve(par, { userId }, ctx) {
        return ctx.prisma.class.findMany({ where: { userId } });
      },
    });

    // get a class
    t.field("class", {
      type: Class,
      args: { id: nonNull(stringArg()) },
      resolve(par, { id }, ctx) {
        return ctx.prisma.class.findFirst({
          where: { id },
        });
      },
    });
  },
});

export const ClassMutation = extendType({
  type: "Mutation",
  definition(t) {
    // create Class for a user
    t.nonNull.field("createClass", {
      type: "Class",
      args: {
        userId: stringArg(),
        name: nonNull(stringArg()),
        description: stringArg(),
      },
      resolve(par, data, ctx) {
        return ctx.prisma.class.create({
          data: {
            ...data,
            sample: SAMPLE,
          },
        });
      },
    });

    // rename a class
    t.field("renameClass", {
      type: Class,
      args: {
        classId: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(par, { classId, name }, ctx) {
        const res: any = await ctx.prisma.class.updateMany({
          where: { id: classId, sample: false },
          data: { name },
        });
        return res?.count !== 0 ? { id: classId, name } : null;
      },
    });

    t.field("updateClass", {
      type: Class,
      args: {
        classId: nonNull(stringArg()),
        name: stringArg(),
        description: stringArg(),
      },
      async resolve(par, { classId, ...x }, ctx) {
        const data: any = x;
        const res: any = await ctx.prisma.class.updateMany({
          where: { id: classId, sample: false },
          data: data,
        });
        return res?.count !== 0 ? { id: classId, ...x } : null;
      },
    });

    //delete a class
    t.field("deleteClass", {
      type: Class,
      args: { classId: nonNull(stringArg()) },
      async resolve(par, { classId }, ctx) {
        const res = await ctx.prisma.class.deleteMany({
          where: { id: classId, sample: false },
        });
        return res?.count !== 0 ? { id: classId } : null;
      },
    });
  },
});
