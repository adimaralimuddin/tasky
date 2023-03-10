import { prisma } from "@prisma/client";
import { extendType, nonNull, objectType, stringArg } from "nexus";
import { ENTITY_LIMIT, SAMPLE } from "../../lib/public";
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
    t.boolean("sample");
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
        id: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        description: stringArg(),
        folderId: nonNull(stringArg()),
        templateId: nonNull(stringArg()),
      },
      async resolve(par, data, ctx) {
        const topicsCount = await ctx.prisma.topic.findMany({
          where: { folderId: data.folderId },
        });

        if (topicsCount?.length >= ENTITY_LIMIT) {
          return null;
        }

        return await ctx.prisma.topic.create({
          data: { ...data, sample: SAMPLE },
          include: {
            Template: true,
          },
        });
      },
    });

    // delete topic
    t.field("deleteTopic", {
      type: Topic,
      args: { userId: nonNull(stringArg()), topicId: nonNull(stringArg()) },
      async resolve(par, { userId, topicId }, ctx) {
        const gotTopic = await ctx.prisma.topic.findFirst({
          where: { id: topicId, userId },
        });
        console.log("got topic ", gotTopic);
        if (gotTopic?.sample === false) {
          return ctx.prisma.topic.delete({
            where: { id: topicId },
            include: {
              cards: true,
            },
          });
        } else {
          return null;
        }
      },
    });

    //rename topic
    t.field("renameTopic", {
      type: Topic,
      args: {
        userId: nonNull(stringArg()),
        topicId: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(par, { userId, topicId, name }, ctx) {
        const res = await ctx.prisma.topic.updateMany({
          where: { id: topicId, sample: false, userId },
          data: { name },
        });
        return res?.count != 0 ? { id: topicId, name, userId } : null;
      },
    });
  },
});
