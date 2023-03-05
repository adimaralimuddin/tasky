import { arg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Field = objectType({
  name: "Field",
  definition(t) {
    t.string("id");
    t.string("viewId");
    t.string("text");
    t.string("type");
    t.int("ind");
    t.string("value");
    t.string("frontId");
    t.string("backId");
  },
});

export const FieldMutation = extendType({
  type: "Mutation",
  definition(t) {
    // create field front
    t.field("createFieldFront", {
      type: Field,
      args: {
        viewId: nonNull(stringArg()),
        frontId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        type: nonNull(stringArg()),
        value: nonNull(stringArg()),
        ind: nonNull(intArg()),
      },
      resolve(par, data: any, ctx) {
        console.log(`helo---------`, data);

        return ctx.prisma.field.create({
          data,
        });
      },
    });

    //update a field
    t.field("updateField", {
      type: Field,
      args: {
        id: nonNull(stringArg()),
        newValue: nonNull(stringArg()),
        val: nonNull(stringArg()),
      },
      resolve(par, { id, newValue, val }, ctx) {
        console.log("par ", par);
        return ctx.prisma.field.update({
          where: { id },
          data: { value: newValue },
        });
      },
    }); // updatefield

    t.field("addField", {
      type: Field,
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
