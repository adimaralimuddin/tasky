import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, objectType, stringArg } from "nexus";
import { ENTITY_LIMIT, SAMPLE, SAMPLE_CLASSES } from "../../lib/public";
// import { Class } from "./class";
// import { Topic } from "./topic";

// export const Folder = objectType({
//   name: "Folder",
//   definition(t) {
//     t.string("id");
//     t.string("name");
//     t.boolean("sample");
//     t.string("classId");
//     t.string("userId");

//     // folder's class
//     t.field("class", {
//       type: "Class",
//       resolve(par, arg, ctx) {
//         const id: any = par.classId;
//         return ctx.prisma.folder.findFirst({
//           where: { id },
//         });
//       },
//     });

//     // folder's topics
//     t.list.field("topics", {
//       type: Topic,
//       resolve(par, arg, ctx) {
//         return ctx.prisma.topic.findMany({
//           where: { folderId: par.id },
//         });
//       },
//     });
//   },
// });

// export const FolderQuery = extendType({
//   type: "Query",
//   definition(t) {
//     t.list.field("foldersByClass", {
//       type: "Folder",
//       args: { classId: nonNull(stringArg()) },
//       resolve(par, { classId }, ctx) {
//         return ctx.prisma.folder.findMany({
//           where: { classId },
//         });
//       },
//     });
//   },
// });

export const FolderMutation = extendType({
  type: "Mutation",
  definition(t) {
    // create folder
    // t.field("createFolder", {
    //   type: "Folder",
    //   args: {
    //     userId: nonNull(stringArg()),
    //     name: nonNull(stringArg()),
    //     classId: nonNull(stringArg()),
    //   },
    //   async resolve(par, data, ctx) {
    //     try {
    //       const folderCounts = await ctx.prisma.folder.findMany({
    //         where: { userId: data.userId },
    //       });
    //       if (folderCounts.length > ENTITY_LIMIT) return null;
    //       return ctx.prisma.folder.create({
    //         data: { ...data, sample: SAMPLE },
    //       });
    //     } catch (error) {
    //       console.log(`Error: folder/graphql : createFolder: `, error);
    //       return null;
    //     }
    //   },
    // });
    //delete folder
    // t.field("deleteFolder", {
    //   type: Folder,
    //   args: { userId: nonNull(stringArg()), id: nonNull(stringArg()) },
    //   async resolve(par, { id, userId }, ctx) {
    //     const res = await ctx.prisma.folder.deleteMany({
    //       where: { id, userId, sample: false },
    //     });
    //     return res?.count !== 0 ? { id } : null;
    //   },
    // });
    // rename folder
    // t.field("renameFolder_", {
    //   type: "Folder",
    //   args: {
    //     userId: nonNull(stringArg()),
    //     classId: nonNull(stringArg()),
    //     folderId: nonNull(stringArg()),
    //     name: nonNull(stringArg()),
    //   },
    //   async resolve(par_, args, ctx) {
    //     const { folderId, name, userId } = args;
    //     try {
    //       const userSession = getSession(ctx.req, ctx.res);
    //       if (!userSession && !SAMPLE_CLASSES.find((c) => c === args.classId)) {
    //         console.log(
    //           `validate: folder/graphql - renameFolder: no user and not sample class`
    //         );
    //         return null;
    //       }
    //       if (userSession && userId !== userSession?.user?.sub) {
    //         console.log(
    //           `validate: folder/graphql - renameFolder: no user and not user folder`
    //         );
    //         return null;
    //       }
    //       const updatedFolderResults = await ctx.prisma.folder.updateMany({
    //         where: { id: folderId, sample: false, userId },
    //         data: { name },
    //       });
    //       console.log(`finish`, updatedFolderResults);
    //       return updatedFolderResults?.count !== 0
    //         ? { id: folderId, name }
    //         : null;
    //     } catch (error) {
    //       console.log(`Error: folder/graphql - renameFolder: `, error);
    //       return null;
    //     }
    //   },
    // });
  },
});
