import { arg, extendType, intArg, nonNull, objectType, stringArg } from "nexus";

export const Field = objectType({
  name: "Field",
  definition(t) {
    t.string("id");
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
        frontId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        type: nonNull(stringArg()),
        value: nonNull(stringArg()),
        ind: nonNull(intArg()),
      },
      resolve(par, data: any, ctx) {
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
    });
  },
});
