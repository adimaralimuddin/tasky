import { extendType, inputObjectType, list, nonNull, stringArg } from "nexus";
import { ENTITY_LIMIT, SAMPLE } from "../../../lib/public";

export const TemplateCreatorDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createTemplate", {
      type: "Template",
      args: {
        name: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        fronts: list(FieldsListInputType),
        backs: list(FieldsListInputType),
      },
      async resolve(par, data, ctx) {
        if (
          (data?.fronts?.length || 0) >= ENTITY_LIMIT ||
          (data?.backs?.length || 0) >= ENTITY_LIMIT
        ) {
          return null;
        }

        try {
          const templatesCounts = await ctx.prisma.template.findMany({
            where: { userId: data?.userId, deleted: false },
          });
          console.log(`template counts`);

          if (templatesCounts?.length >= ENTITY_LIMIT) {
            return null;
          }
          const template = await ctx.prisma.template.create({
            data: { ...data, sample: SAMPLE },
          });

          console.log(`tempalte created: `, template);

          return template;
        } catch (error) {
          console.log(`Error: template/graphql createTemplate: `, error);

          return error;
        }
      },
    });
  },
});

export const FieldsListInputType = inputObjectType({
  name: "FieldListInputType",
  definition(t) {
    t.string("viewId");
    t.string("text");
    t.string("type");
    t.boolean("view");
  },
});
