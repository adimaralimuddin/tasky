import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
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
        return ctx.prisma.class.findMany({ where: { userId, sample: false } });
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

    // class dashboard
    t.field("classDashboard", {
      type: Class,
      args: { id: nonNull(stringArg()) },
      resolve(par_, { id }, ctx) {
        return ctx.prisma.class.findUnique({
          where: { id },
          include: {
            folders: {
              include: {
                topic: {
                  include: {
                    cards: true,
                  },
                },
              },
            },
          },
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
      async resolve(par, data, ctx) {
        // allow user to create more class if user classes are less than limit which is 5

        const classCount = await ctx.prisma.class.count({
          where: { userId: data.userId },
        });

        // check if user allowed to create more class
        if (classCount >= 5) return null;

        // user is still allowed to create new class
        const createdClass: any = await ctx.prisma.class.create({
          data: {
            ...data,
            sample: SAMPLE,
          },
        });

        // class has been created and to be returned
        return createdClass;
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
