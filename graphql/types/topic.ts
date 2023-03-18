// import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, objectType, stringArg } from "nexus";
// import {
//   DEF_USERID,
//   ENTITY_LIMIT,
//   SAMPLE,
//   SAMPLE_CLASSES,
// } from "../../lib/public";
// import _getSampleClass from "../../lib/utils/utilsDb/_dbGetSampleClass";
// import { ContextType } from "../context";
// import { Card } from "./card";

// export const Topic = objectType({
//   name: "Topic",
//   definition(t) {
//     t.string("id");
//     t.string("name");
//     t.string("classId");
//     t.string("description");
//     t.string("userId");
//     t.string("folderId");
//     t.string("templateId");
//     t.boolean("sample");

//     t.field("template", {
//       type: "Template",
//       resolve(par: any, arg, ctx) {
//         return par?.Template;
//       },
//     });

//     // cards
//     t.list.field("cards", {
//       type: Card,
//       resolve(par, arg, ctx) {
//         return ctx.prisma.card.findMany({
//           where: { topicId: par.id },
//         });
//       },
//     });
//   },
// });

export const TopicQuery = extendType({
  type: "Query",
  definition(t) {
    // get folder's topic
    // t.list.field("topicsByFolders", {
    //   type: "Topic",
    //   args: { folderId: nonNull(stringArg()) },
    //   resolve(par, { folderId }, ctx) {
    //     return ctx.prisma.topic.findMany({
    //       where: { folderId },
    //       include: {
    //         Template: true,
    //       },
    //     });
    //   },
    // });
    // get topic
    // t.field("topic", {
    //   type: "Topic",
    //   args: { topicId: nonNull(stringArg()) },
    //   resolve(par, { topicId }, ctx) {
    //     return ctx.prisma.topic.findFirst({
    //       where: { id: topicId },
    //     });
    //   },
    // });
    //get topic by userid
    // t.list.field("userTopic", {
    //   type: "Topic",
    //   args: { userId: nonNull(stringArg()) },
    //   resolve(par, { userId }, ctx) {
    //     return ctx.prisma.topic.findMany({
    //       where: { userId },
    //       select: {
    //         id: true,
    //         name: true,
    //       },
    //     });
    //   },
    // });
  },
});

export const TopicMutation = extendType({
  type: "Mutation",
  definition(t) {
    // create topic ==========================================================
    // t.field("createTopic", {
    //   type: Topic,
    //   args: {
    //     id: nonNull(stringArg()),
    //     classId: nonNull(stringArg()),
    //     userId: stringArg(),
    //     name: nonNull(stringArg()),
    //     description: stringArg(),
    //     folderId: nonNull(stringArg()),
    //     templateId: nonNull(stringArg()),
    //   },
    //   async resolve(par, { classId, ...args }, ctx: ContextType) {
    //     try {
    //       const userSession = getSession(ctx.req, ctx.res);
    //       const isSampleClass = await ctx.prisma.class.findFirst({
    //         where: { id: classId, sample: true },
    //       });
    //       // ---------------------------------------------------
    //       if (!userSession) {
    //         if (!isSampleClass) {
    //           console.log(
    //             `validate: topic/graphql - addTopic: no user and not sample class`
    //           );
    //           return null;
    //         }
    //         args.userId = DEF_USERID;
    //       }
    //       // ---------------------------------------------------
    //       //  for authenticated request
    //       if (userSession) {
    //         const isMyClass = await ctx.prisma.class.findFirst({
    //           where: { id: classId, userId: userSession.user.sub },
    //         });
    //         if (!isMyClass && !isSampleClass) {
    //           console.log(
    //             `validate: topic/graphql - addTopic: not owns class, not sample class`
    //           );
    //           return null;
    //         }
    //       }
    //       // ----------------------------------------------------------
    //       const topicsCount = await ctx.prisma.topic.findMany({
    //         where: { folderId: args.folderId },
    //       });
    //       if (topicsCount?.length >= ENTITY_LIMIT) {
    //         return null;
    //       }
    //       const createdTopic = await ctx.prisma.topic.create({
    //         data: { ...args, sample: SAMPLE },
    //         include: {
    //           Template: true,
    //         },
    //       });
    //       return createdTopic;
    //     } catch (error) {
    //       console.log(`Error: topics/graphql - createCard: `, error);
    //       return null;
    //     }
    //   },
    // });
    // delete topic #############################################################
    // t.field("deleteTopic", {
    //   type: Topic,
    //   args: {
    //     userId: stringArg(),
    //     classId: nonNull(stringArg()),
    //     topicId: nonNull(stringArg()),
    //   },
    //   async resolve(par, args, ctx) {
    //     const { userId, topicId, classId } = args;
    //     console.log(`args`, args);
    //     const topicToDelete = await ctx.prisma.topic.findFirst({
    //       where: { id: topicId, userId },
    //     });
    //     const userSession = getSession(ctx.req, ctx.res);
    //     const isSampleClass = await _getSampleClass(classId);
    //     console.log(`isSampleClass`, isSampleClass);
    //     if (userSession) {
    //       if (userSession.user.sub !== topicToDelete && !isSampleClass) {
    //         console.log(
    //           `Validate: topic/graphql - deleteTopic: not owns topic and not sample class`
    //         );
    //         return null;
    //       }
    //     }
    //     if (!userSession && !isSampleClass) {
    //       console.log(
    //         `Validate: topic/graphql - deleteTopic: not authenticated and not a sample class.`
    //       );
    //       return null;
    //     }
    //     if (topicToDelete?.sample) {
    //       console.log(
    //         `Validate: topic/graphql - deleteTopic: topic is a sample, must not be deleted.`
    //       );
    //       return null;
    //     }
    //     console.log("got topic ", topicToDelete);
    //     const deletedTopic = await ctx.prisma.topic.delete({
    //       where: { id: topicId },
    //       include: {
    //         cards: true,
    //       },
    //     });
    //     return deletedTopic;
    //   },
    // });
    //rename topic ################################################################
    // t.field("renameTopic", {
    //   type: Topic,
    //   args: {
    //     userId: nonNull(stringArg()),
    //     topicId: nonNull(stringArg()),
    //     name: nonNull(stringArg()),
    //   },
    //   async resolve(par, { userId, topicId, name }, ctx) {
    //     const res = await ctx.prisma.topic.updateMany({
    //       where: { id: topicId, sample: false, userId },
    //       data: { name },
    //     });
    //     return res?.count != 0 ? { id: topicId, name, userId } : null;
    //   },
    // });
  },
});
