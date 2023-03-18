import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { ENTITY_LIMIT, SAMPLE } from "../../lib/public";
import { FieldsListInputType } from "./templateDefs/TemplateCreatorDefs";

// export const Template = objectType({
//   name: "Template",
//   definition(t) {
//     t.string("id");
//     t.string("name");
//     t.string("userId");
//     t.boolean("deleted");
//     t.string("fronts");
//     t.boolean("sample");
//     //fronts
//     t.field("fronts", {
//       type: "String",
//       resolve(par: any) {
//         return JSON.stringify(par?.fronts);
//       },
//     });
//     //backs
//     t.field("backs", {
//       type: "String",
//       resolve(par: any) {
//         return JSON.stringify(par?.backs);
//       },
//     });
//   },
// });

export const TemplateQuery = extendType({
  type: "Query",
  definition(t) {
    //sample templates
    // t.list.field("sampleTemplates", {
    //   type: "Template",
    //   async resolve(par_, arg_, ctx) {
    //     try {
    //       const sampleTemplates = await ctx.prisma.template.findMany({
    //         where: { sample: true },
    //       });
    //       // console.log(`sampleTemplates`, sampleTemplates);
    //       return sampleTemplates;
    //     } catch (error) {
    //       console.log(`Error: template/graphql sampleTemplates: `, error);
    //       return null;
    //     }
    //   },
    // });
    //template
    // t.field("template", {
    //   type: "Template",
    //   args: { id: nonNull(stringArg()) },
    //   resolve(par, { id }, ctx) {
    //     return ctx.prisma.template.findFirst({
    //       where: { id },
    //     });
    //   },
    // });
    //templates
    // t.list.field("templates", {
    //   type: "Template",
    //   args: { userId: nonNull(stringArg()) },
    //   resolve(par, { userId }, ctx) {
    //     try {
    //       return ctx.prisma.template.findMany({
    //         where: { userId, deleted: false },
    //       });
    //     } catch (error) {
    //       console.log(`Error: templateGraphql query templates: `, error);
    //       return null;
    //     }
    //   },
    // });
  },
});

export const TemplateMutation = extendType({
  type: "Mutation",

  // create template
  definition(t) {
    // t.field("createTemplate", {
    //   type: "Template",
    //   args: {
    //     name: nonNull(stringArg()),
    //     userId: nonNull(stringArg()),
    //     fronts: list(FieldsListInputType),
    //     backs: list(FieldsListInputType),
    //   },
    //   async resolve(par, data, ctx) {
    //     if (
    //       (data?.fronts?.length || 0) >= ENTITY_LIMIT ||
    //       (data?.backs?.length || 0) >= ENTITY_LIMIT
    //     ) {
    //       return null;
    //     }
    //     try {
    //       const templatesCounts = await ctx.prisma.template.findMany({
    //         where: { userId: data?.userId, deleted: false },
    //       });
    //       console.log(`template counts`);
    //       if (templatesCounts?.length >= ENTITY_LIMIT) {
    //         return null;
    //       }
    //       const template = await ctx.prisma.template.create({
    //         data: { ...data, sample: SAMPLE },
    //       });
    //       console.log(`tempalte created: `, template);
    //       return template;
    //     } catch (error) {
    //       console.log(`Error: template/graphql createTemplate: `, error);
    //       return error;
    //     }
    //   },
    // });
    // delete template
    // t.field("deleteTemplate", {
    //   type: "Template",
    //   args: { templateId: nonNull(stringArg()) },
    //   async resolve(par, { templateId }, ctx) {
    //     const res: any = await ctx.prisma.template.updateMany({
    //       where: { id: templateId, sample: false },
    //       data: { deleted: true },
    //     });
    //     return res?.count !== 0 ? { id: templateId } : null;
    //   },
    // });
    // t.field("updateTemplate", {
    //   type: "Template",
    //   args: {
    //     id: nonNull(stringArg()),
    //     userId: nonNull(stringArg()),
    //     name: nonNull(stringArg()),
    //     fronts: list(FieldsListInputType),
    //     backs: list(FieldsListInputType),
    //   },
    //   async resolve(par, { id, userId, name, fronts, backs }, ctx) {
    //     try {
    //       const data: any = { name, fronts, backs };
    //       const res: any = await ctx.prisma.template.updateMany({
    //         where: { id, userId },
    //         data,
    //       });
    //       return res?.count != 0 ? { id, name, fronts, backs } : null;
    //     } catch (error) {
    //       console.log(`Error: template/grapql updateTemplate: `, error);
    //       return null;
    //     }
    //   },
    // });
  },
});

// const FieldsListInputType = inputObjectType({
//   name: "FieldListInputType",
//   definition(t) {
//     t.string("viewId");
//     t.string("text");
//     t.string("type");
//     t.boolean("view");
//   },
// });
