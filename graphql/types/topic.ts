import { extendType, nonNull, objectType, stringArg } from "nexus";
import { Card } from "./card";

export const Topic = objectType({
  name: "Topic",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("description");
    t.string("userId");
    t.string("folderId");
    t.string("templateId");
    t.field("template", {
      type: "Template",
      // args: {},
      resolve(par: any, arg, ctx) {
        return par?.Template;
      },
    });

    // cards
    t.list.field("cards", {
      type: Card,
      resolve(par, arg, ctx) {
        return ctx.prisma.card.findMany({
          where: { topicId: par.id },
        });
      },
    });
  },
});

export const TopicQuery = extendType({
  type: "Query",
  definition(t) {
    // get folder's topic
    t.list.field("topicsByFolders", {
      type: Topic,
      args: { folderId: nonNull(stringArg()) },
      resolve(par, { folderId }, ctx) {
        return ctx.prisma.topic.findMany({
          where: { folderId },
          include: {
            Template: true,
          },
        });
      },
    });

    // get topic
    t.field("topic", {
      type: Topic,
      args: { topicId: nonNull(stringArg()) },
      resolve(par, { topicId }, ctx) {
        return ctx.prisma.topic.findFirst({
          where: { id: topicId },
        });
      },
    });

    //get topic by userid
    t.list.field("userTopic", {
      type: Topic,
      args: { userId: nonNull(stringArg()) },
      resolve(par, { userId }, ctx) {
        return ctx.prisma.topic.findMany({
          where: { userId },
          select: {
            id: true,
            name: true,
          },
        });
      },
    });
  },
});

export const TopicMutation = extendType({
  type: "Mutation",
  definition(t) {
    // create topic
    t.field("createTopic", {
      type: Topic,
      args: {
        userId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        description: stringArg(),
        folderId: nonNull(stringArg()),
        templateId: nonNull(stringArg()),
      },
      resolve(par, data: any, ctx) {
        return ctx.prisma.topic.create({
          data,
          include: {
            Template: true,
          },
        });
      },
    });

    // delete topic
    t.field("deleteTopic", {
      type: Topic,
      args: { topicId: nonNull(stringArg()) },
      resolve(par, { topicId }, ctx) {
        return ctx.prisma.topic.delete({
          where: { id: topicId },
          include: {
            cards: true,
          },
        });
      },
    });

    //rename topic
    t.field("renameTopic", {
      type: Topic,
      args: { topicId: nonNull(stringArg()), name: nonNull(stringArg()) },
      resolve(par, { topicId, name }, ctx) {
        return ctx.prisma.topic.update({
          where: { id: topicId },
          data: { name },
        });
      },
    });
  },
});
