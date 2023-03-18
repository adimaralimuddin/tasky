import { extendType, list, nonNull, stringArg } from "nexus";
import { FieldsListInputType } from "./TemplateCreatorDefs";

export const TemplateUpdaterDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("updateTemplate", {
      type: "Template",
      args: {
        id: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        fronts: list(FieldsListInputType),
        backs: list(FieldsListInputType),
      },
      async resolve(par, { id, userId, name, fronts, backs }, ctx) {
        try {
          const data: any = { name, fronts, backs };
          const res: any = await ctx.prisma.template.updateMany({
            where: { id, userId },
            data,
          });

          return res?.count != 0 ? { id, name, fronts, backs } : null;
        } catch (error) {
          console.log(`Error: template/grapql updateTemplate: `, error);
          return null;
        }
      },
    });
  },
});
