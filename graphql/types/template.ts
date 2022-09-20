import {
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";

const Xamp = objectType({
  name: "Xamp",
  definition(t) {
    t.string("text");
    t.string("type");
  },
});

export const Template = objectType({
  name: "Template",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("userId");
    t.boolean("deleted");
    t.string("fronts");
    //fronts
    t.field("fronts", {
      type: "String",
      resolve(par: any) {
        return JSON.stringify(par?.fronts);
      },
    });
    //backs
    t.field("backs", {
      type: "String",
      resolve(par: any) {
        return JSON.stringify(par?.backs);
      },
    });
  },
});

export const TemplateQuery = extendType({
  type: "Query",
  definition(t) {
    //template
    t.field("template", {
      type: Template,
      args: { id: nonNull(stringArg()) },
      resolve(par, { id }, ctx) {
        return ctx.prisma.template.findFirst({
          where: { id },
        });
      },
    });
    //templates
    t.list.field("templates", {
      type: Template,
      args: { userId: nonNull(stringArg()) },
      resolve(par, { userId }, ctx) {
        return ctx.prisma.template.findMany({
          where: { userId, deleted: false },
        });
      },
    });
  },
});

export const TemplateMutation = extendType({
  type: "Mutation",

  // create template
  definition(t) {
    t.field("createTemplate", {
      type: Template,
      args: {
        name: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        fronts: list(FieldsListInputType),
        backs: list(FieldsListInputType),
      },
      resolve(par, data: any, ctx) {
        return ctx.prisma.template.create({ data });
      },
    });

    // delete template
    t.field("deleteTemplate", {
      type: Template,
      args: { templateId: nonNull(stringArg()) },
      resolve(par, { templateId }, ctx) {
        return ctx.prisma.template.update({
          where: { id: templateId },
          data: { deleted: true },
        });
      },
    });

    t.field("updateTemplate", {
      type: Template,
      args: {
        id: nonNull(stringArg()),
        name: nonNull(stringArg()),
        fronts: list(FieldsListInputType),
        backs: list(FieldsListInputType),
      },
      resolve(par, { id, name, fronts, backs }, ctx) {
        const data: any = { name, fronts, backs };
        return ctx.prisma.template.update({
          where: { id },
          data,
        });
      },
    });
  },
});

const FieldsListInputType = inputObjectType({
  name: "FieldListInputType",
  definition(t) {
    t.string("text");
    t.string("type");
  },
});
