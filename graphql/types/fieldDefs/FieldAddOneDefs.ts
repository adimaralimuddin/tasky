import { extendType, intArg, nonNull, stringArg } from "nexus";

export const FieldAddOneDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addField", {
      type: "Field",
      args: {
        id: nonNull(stringArg()),
        ind: nonNull(intArg()),
        viewId: nonNull(stringArg()),
        value: nonNull(stringArg()),
        type: nonNull(stringArg()),
        text: nonNull(stringArg()),
        frontId: stringArg(),
        backId: stringArg(),
      },
      async resolve(par, args, ctx) {
        try {
          const res = await ctx.prisma.field.create({
            data: args,
          });
          console.log(`res over here`, res);
          return res;
        } catch (error) {
          console.log(`Error: field/grapql addfield/resolve `, error);
          return error;
        }
      },
    });
  },
});
