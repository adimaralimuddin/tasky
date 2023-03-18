import { extendType, nonNull, stringArg } from "nexus";

export const FieldUpdaterDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateField", {
      type: "Field",
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
  },
});
