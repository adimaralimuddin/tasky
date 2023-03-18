import { extendType, nonNull, stringArg } from "nexus";

export const TemplateDeleterDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteTemplate", {
      type: "Template",
      args: { templateId: nonNull(stringArg()) },
      async resolve(par, { templateId }, ctx) {
        const res: any = await ctx.prisma.template.updateMany({
          where: { id: templateId, sample: false },
          data: { deleted: true },
        });
        return res?.count !== 0 ? { id: templateId } : null;
      },
    });
  },
});
