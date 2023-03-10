import {
  arg,
  extendType,
  inputObjectType,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
import { SAMPLE } from "../../lib/public";
import { Field } from "./field";

const Count = objectType({
  name: "Count",
  definition(t) {
    t.int("id");
  },
});
export const Dashboard = objectType({
  name: "Dashboard",
  definition(t) {
    t.field("_count", { type: Count });
    t.string("level");
    t.string("category");
  },
});

export const Card = objectType({
  name: "Card",
  definition(t) {
    t.string("id");
    // t.string("classId");
    t.string("topicId");
    t.string("userId");
    t.string("name");
    t.string("description");
    t.string("level");
    t.string("category");
    t.boolean("sample");
    t.boolean("def");
    t.field("_count", { type: Count });
    t.field("Dashboard", {
      type: Dashboard,
      resolve(par) {
        return par;
      },
    });

    // fronts
    t.list.field("fronts", {
      type: Field,
      resolve(par, arg, ctx) {
        return ctx.prisma.field.findMany({
          where: { frontId: par.id },
        });
      },
    });
    // backs

    t.list.field("backs", {
      type: Field,
      resolve(par, arg, ctx) {
        return ctx.prisma.field.findMany({
          where: { backId: par.id },
        });
      },
    });
  },
});

export const FieldInputType = inputObjectType({
  name: "CommentInputType",
  definition(t) {
    t.nonNull.string("id");
    t.nonNull.int("ind");
    t.nonNull.string("viewId");
    t.nonNull.string("text");
    t.nonNull.string("value");
    t.nonNull.string("type");
  },
});

export const CardQueries = extendType({
  type: "Query",
  definition(t) {
    // get topic's card
    t.list.field("cardsByTopic", {
      type: Card,
      args: { topicId: nonNull(stringArg()) },
      resolve(par, { topicId }, ctx) {
        return ctx.prisma.card.findMany({
          where: { topicId },
        });
      },
    });

    //get new cards
    t.list.field("dashboard", {
      type: Card,
      args: { classId: nonNull(stringArg()) },
      resolve(par, { classId }, ctx) {
        return ctx.prisma.card.groupBy({
          by: ["level", "category"],
          where: {
            Topic: {
              folder: {
                classId,
              },
            },
          },
          _count: {
            id: true,
          },
        });
      },
    });
  },
});

export const CardMutaion = extendType({
  type: "Mutation",
  definition(t) {
    // create card
    t.field("createCard", {
      type: Card,
      args: {
        id: nonNull(stringArg()),
        userId: nonNull(stringArg()),
        topicId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        description: stringArg(),
        level: stringArg({ default: "hard" }),
        category: stringArg({ default: "new" }),
        fronts: list(arg({ type: FieldInputType })),
        backs: list(arg({ type: FieldInputType })),
      },
      async resolve(par, arg, ctx) {
        const cardCounts = await ctx.prisma.card.findMany({
          where: { topicId: arg.topicId },
        });

        console.log(`cards counts: `, cardCounts?.length);
        if (cardCounts?.length >= 20) {
          return null;
        }

        const ret: any = await ctx.prisma.card.create({
          data: {
            id: arg.id,
            userId: arg.userId,
            topicId: arg.topicId,
            name: arg.name,
            description: arg.description,
            level: arg.level,
            category: arg.category,
            sample: SAMPLE,
            fronts: { create: arg.fronts },
            backs: { create: arg.backs },
          },
        });
        console.log(`card added to the database :`, ret);

        return ret;
      },
    });

    // delete card
    t.field("deleteCard", {
      type: Card,
      args: {
        userId: nonNull(stringArg()),
        cardId: nonNull(stringArg()),
      },
      async resolve(par, { cardId, userId }, { prisma }) {
        const res = await prisma.card.deleteMany({
          where: {
            id: cardId,
            userId,
            sample: false,
          },
        });
        return res?.count != 0 ? { id: cardId } : null;
      },
    });

    //set card level
    t.field("setCardLevel", {
      type: Card,
      args: { cardId: nonNull(stringArg()), level: stringArg() },
      resolve(par, { cardId, level }, ctx) {
        return ctx.prisma.card.update({
          where: { id: cardId },
          data: { level, category: level == "easy" ? "passed" : "left" },
        });
      },
    });
  },
});
