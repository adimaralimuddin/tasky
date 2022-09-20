import { arg, extendType, nonNull, objectType, stringArg } from "nexus";
import { Class } from "./class";

export const User = objectType({
  name: "User",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("email");
    t.list.field("class", {
      type: Class,
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

export const UserQuery = extendType({
  type: "Query",
  definition(t) {
    // get all user
    t.nonNull.list.field("users", {
      type: "User",
      resolve(par, arg, ctx) {
        return ctx.prisma.user.findMany();
      },
    }),
      // get single user
      t.field("user", {
        type: "User",
        args: {
          id: nonNull(stringArg()),
        },
        resolve(par, { id }, ctx) {
          return ctx.prisma.user.findFirst({
            where: { id },
          });
        },
      });
  },
});

export const UserMutation = extendType({
  type: "Mutation",
  definition(t) {
    // create user
    t.nonNull.field("createUser", {
      type: "User",
      args: {
        id: nonNull(stringArg()),
        name: nonNull(stringArg()),
        email: nonNull(stringArg()),
      },
      resolve(par, data, ctx) {
        return ctx.prisma.user.create({
          data,
        });
      },
    });

    // delete user
    t.field("deleteUser", {
      type: "User",
      args: { id: nonNull(stringArg()) },
      resolve(par, { id }, ctx) {
        return ctx.prisma.user.delete({
          where: { id },
        });
      },
    });

    //update user
    t.nonNull.field("updateUser", {
      type: "User",
      args: { id: nonNull(stringArg()), name: nonNull(stringArg()) },
      resolve(par, { id, name }, { prisma }) {
        return prisma.user.update({ where: { id }, data: { name } });
      },
    });
  },
});
