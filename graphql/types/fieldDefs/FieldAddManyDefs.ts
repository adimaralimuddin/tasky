import { extendType, intArg, nonNull, stringArg } from "nexus";

export const FieldAddManyDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createFieldFront", {
      type: "Field",
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
  },
});
