import {
  extendType,
  intArg,
  list,
  nonNull,
  objectType,
  stringArg,
} from "nexus";
// import { Card } from "./card";

// export const Stats = objectType({
//   name: "Stats",
//   definition(t) {
//     t.string("time");
//     t.string("classId");
//     t.int("easy");
//     t.int("normal");
//     t.int("hard");
//     t.list.string("easyCards");
//     t.list.string("normalCards");
//     t.list.string("hardCards");
//   },
// });

export const StatsQuery = extendType({
  type: "Query",
  definition(t) {
    // t.list.field("stats", {
    //   type: 'Stats',
    //   args: {
    //     classId: nonNull(stringArg()),
    //   },
    //   async resolve(par_, { classId }, ctx) {
    //     const stats = await ctx.prisma.stats.findMany({
    //       where: { classId },
    //       orderBy: { time: "desc" },
    //       take: 10,
    //     });

    //     return stats;
    //   },
    // }); // stats

    // t.list.field("cardsByField", {
    //   type: 'Card',
    //   args: {
    //     classId: nonNull(stringArg()),
    //     field: nonNull(stringArg()),
    //     value: nonNull(stringArg()),
    //   },
    //   async resolve(par_, { field, value, classId }, ctx) {
    //     try {
    //       const cards = await ctx.prisma.card.findMany({
    //         where: { [field]: value, classId },
    //       });
    //       return cards;
    //     } catch (error) {
    //       console.log(`Error: dashbaord/graphql cardsByField: `, error);

    //       return error;
    //     }
    //   },
    // });
  },
});

// export const StatsMutate = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.field("addStat", {
//       type: 'Stats',
//       args: {
//         time: nonNull(stringArg()),
//         classId: nonNull(stringArg()),
//         easy: nonNull(intArg()),
//         normal: nonNull(intArg()),
//         hard: nonNull(intArg()),
//         easyCards: list(stringArg()),
//         normalCards: list(stringArg()),
//         hardCards: list(stringArg()),
//       },
//       async resolve(par_, args, ctx) {
//         const { time, classId } = args;
//         try {
//           const existingStats = await ctx.prisma.stats.findFirst({
//             where: { time, classId },
//           });

//           if (existingStats) {
//             const { classId, time, ...statsData } = args;
//             const updatedStat = await ctx.prisma.stats.update({
//               where: { classId_time: { classId, time } },
//               data: { ...statsData, time },
//             });

//             return updatedStat;
//           } else {
//             const result = await ctx.prisma.stats.create({
//               data: {
//                 ...args,
//               },
//             });

//             return result;
//           }
//         } catch (error) {
//           console.log(`Error: state: mutation > addStat = `, error);

//           return null;
//         }
//       },
//     });
//   },
// });
