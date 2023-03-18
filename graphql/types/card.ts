// import { getSession } from "@auth0/nextjs-auth0";
import {
  arg,
  extendType,
  inputObjectType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
// import { DEF_USERID, SAMPLE } from "../../lib/public";
// import _dbGetSampleClass from "../../lib/utils/utilsDb/_dbGetSampleClass";
// import { FieldInputType } from "./cardDefs";
// import { Field } from "./field";

// const Count = objectType({
//   name: "Count",
//   definition(t) {
//     t.int("id");
//   },
// });
// export const Dashboard = objectType({
//   name: "Dashboard",
//   definition(t) {
//     t.field("_count", { type: Count });
//     t.string("level");
//     t.string("category");
//   },
// });

// export const Card = objectType({
//   name: "Card",
//   definition(t) {
//     t.string("id");
//     t.string("ind");
//     t.string("classId");
//     t.string("topicId");
//     t.string("userId");
//     t.string("name");
//     t.string("description");
//     t.string("level");
//     t.string("category");
//     t.boolean("sample");
//     t.boolean("def");
//     t.field("_count", { type: "Count" });
//     t.field("Dashboard", {
//       type: "Dashboard",
//       resolve(par) {
//         return par;
//       },
//     });

//     // fronts
//     t.list.field("fronts", {
//       type: Field,
//       resolve(par, arg, ctx) {
//         return ctx.prisma.field.findMany({
//           where: { frontId: par.id },
//         });
//       },
//     });
//     // backs

//     t.list.field("backs", {
//       type: Field,
//       resolve(par, arg, ctx) {
//         return ctx.prisma.field.findMany({
//           where: { backId: par.id },
//         });
//       },
//     });
//   },
// });

// export const FieldInputType = inputObjectType({
//   name: "CommentInputType",
//   definition(t) {
//     t.nonNull.string("id");
//     t.nonNull.int("ind");
//     t.nonNull.string("viewId");
//     t.nonNull.string("text");
//     t.nonNull.string("value");
//     t.nonNull.string("type");
//   },
// });

export const CardQueries = extendType({
  type: "Query",
  definition(t) {
    // get topic's card
    // t.list.field("cardsByTopic", {
    //   type: "Card",
    //   args: { topicId: nonNull(stringArg()) },
    //   resolve(par, { topicId }, ctx) {
    //     return ctx.prisma.card.findMany({
    //       where: { topicId },
    //     });
    //   },
    // });
    //get new cards
    // t.list.field("dashboard", {
    //   type: "Card",
    //   args: { classId: nonNull(stringArg()) },
    //   resolve(par, { classId }, ctx) {
    //     return ctx.prisma.card.groupBy({
    //       by: ["level", "category"],
    //       where: {
    //         Topic: {
    //           folder: {
    //             classId,
    //           },
    //         },
    //       },
    //       _count: {
    //         id: true,
    //       },
    //     });
    //   },
    // });
    // get cards in id lists
    // t.list.field("cardsByIds", {
    //   type: "Card",
    //   args: { ids: list(stringArg()) },
    //   async resolve(par_, args, ctx) {
    //     try {
    //       const topics = await ctx.prisma.card.findMany({
    //         where: { id: { in: args?.ids } },
    //       });
    //       return topics;
    //     } catch (error) {
    //       console.log(`Error: topic: topicByIds > resolver: `, error);
    //       return error;
    //     }
    //   },
    // });
  },
});

// export const CardMutaion = extendType({
//   type: "Mutation",
//   definition(t) {
// create card
// t.field("createCard", {
//   type: Card,
//   args: {
//     id: nonNull(stringArg()),
//     ind: nonNull(intArg()),
//     classId: nonNull(stringArg()),
//     userId: stringArg(),
//     topicId: nonNull(stringArg()),
//     name: nonNull(stringArg()),
//     description: stringArg(),
//     level: stringArg({ default: "hard" }),
//     category: stringArg({ default: "new" }),
//     fronts: list(arg({ type: FieldInputType })),
//     backs: list(arg({ type: FieldInputType })),
//   },
//   async resolve(par, args, { req, res, prisma }) {
//     const { fronts, backs, ...otherCardData } = args;
//     console.log(`card adder args`, args);
//     const user = getSession(req, res)?.user;
//     const isSampleClass = await _dbGetSampleClass(args.classId);

//     console.log(`user`, user);
//     console.log(`samplecasses `, isSampleClass);

//     if (!user) {
//       if (!isSampleClass) {
//         console.log(`Validate:
//         cardAdderDefs
//         msg: not authenticated and not sample class.`);
//         return null;
//       }
//       otherCardData.userId = DEF_USERID;
//     }

//     if (user) {
//       const isMyClass = await prisma.class.findFirst({
//         where: { id: args.classId, userId: user.sub },
//       });
//       if (!isMyClass && !isSampleClass) {
//         console.log(`
//         Validate:
//         @cardAdderDefs
//         msg: not owns class and not sample class`);
//         return null;
//       }
//     }

//     const cardCounts = await prisma.card.findMany({
//       where: { topicId: args.topicId },
//     });

//     console.log(`cards counts: - `, cardCounts?.length);
//     if (cardCounts?.length >= 20) {
//       return null;
//     }

//     console.log(`to create cards db - `, args);

//     const ret: any = await prisma.card.create({
//       data: {
//         ...otherCardData,
//         sample: SAMPLE,
//         fronts: { create: args.fronts },
//         backs: { create: args.backs },
//       },
//     });
//     console.log(`card added to the database - :`, ret);

//     return ret;
//   },
// });

// delete card
// t.field("deleteCardd", {
//   type: Card,
//   args: {
//     userId: nonNull(stringArg()),
//     cardId: nonNull(stringArg()),
//   },
//   async resolve(par, { cardId, userId }, { prisma }) {
//     const res = await prisma.card.deleteMany({
//       where: {
//         id: cardId,
//         userId,
//         sample: false,
//       },
//     });
//     return res?.count != 0 ? { id: cardId } : null;
//   },
// });

//set card level
// t.field("setCardLevel", {
//   type: Card,
//   args: { cardId: nonNull(stringArg()), level: stringArg() },
//   resolve(par, { cardId, level }, ctx) {
//     return ctx.prisma.card.update({
//       where: { id: cardId },
//       data: { level, category: level == "easy" ? "passed" : "left" },
//     });
//   },
// });
//   },
// });

