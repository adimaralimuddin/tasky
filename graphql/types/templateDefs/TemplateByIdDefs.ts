import { extendType, nonNull, stringArg } from "nexus";

export const TemplateByIdDefs = extendType({
  type: "Query",
  definition(t) {
    t.field("template", {
      type: "Template",
      args: { id: nonNull(stringArg()) },
      resolve(par, { id }, ctx) {
        return ctx.prisma.template.findFirst({
          where: { id },
        });
      },
    });
  },
});
