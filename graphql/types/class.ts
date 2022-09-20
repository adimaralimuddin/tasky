import { extendType, nonNull, objectType, stringArg } from "nexus";
import { Folder } from "./folder";

export const Class = objectType({
  name: "Class",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("userId");
    t.string("description");
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
    // get all classes
    t.nonNull.list.field("classes", {
      type: "Class",
      resolve(par_, arg_, ctx) {
        return ctx.prisma.class.findMany();
      },
    });

    //defaul classes
    // t.list.field('defaultClasses', {
    //   type: Class,
    //   resolve(par_, arg_, ctx) {
    //     return ctx.prisma.class.findMany({
    //       where:{classi}
    //     })
    //   }
    // })

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
        return ctx.prisma.class.create({ data });
      },
    });

    // rename a class
    t.field("renameClass", {
      type: Class,
      args: {
        classId: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      resolve(par, { classId, name }, ctx) {
        return ctx.prisma.class.update({
          where: { id: classId },
          data: { name },
        });
      },
    });

    t.field("updateClass", {
      type: Class,
      args: {
        classId: nonNull(stringArg()),
        name: stringArg(),
        description: stringArg(),
      },
      resolve(par, { classId, ...x }, ctx) {
        const data: any = x;
        return ctx.prisma.class.update({
          where: { id: classId },
          data: data,
        });
      },
    });

    //delete a class
    t.field("deleteClass", {
      type: Class,
      args: { classId: nonNull(stringArg()) },
      resolve(par, { classId }, ctx) {
        return ctx.prisma.class.delete({
          where: { id: classId },
        });
      },
    });
  },
});
