import { extendType } from "nexus";

export const SampleTemplatesDefs = extendType({
  type: "Query",
  definition(t) {
    t.list.field("sampleTemplates", {
      type: "Template",
      async resolve(par_, arg_, ctx) {
        try {
          const sampleTemplates = await ctx.prisma.template.findMany({
            where: { sample: true },
          });
          // console.log(`sampleTemplates`, sampleTemplates);

          return sampleTemplates;
        } catch (error) {
          console.log(`Error: template/graphql sampleTemplates: `, error);

          return null;
        }
      },
    });
  },
});
