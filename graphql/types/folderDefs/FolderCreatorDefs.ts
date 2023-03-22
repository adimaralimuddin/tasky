import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import { ENTITY_LIMIT, SAMPLE } from "../../../lib/public";
import _dbGetSampleClass from "../../../lib/utils/utilsDb/_dbGetSampleClass";
import { _unsuccessfulResponse } from "../../../lib/utils/utilsDb/_dbResponse";
import { ContextType } from "../../context";

export const FolderCreatorDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createFolder", {
      type: "Folder",
      args: {
        userId: stringArg(),
        name: nonNull(stringArg()),
        classId: nonNull(stringArg()),
      },
      async resolve(par, args, ctx: ContextType) {
        const { req, res, prisma } = ctx;
        const user = getSession(req, res)?.user;
        const isSampleClass = await _dbGetSampleClass(args.classId);
        try {
          // ------------------------------------------
          // handle unauthenticated request
          if (!user && !isSampleClass) {
            return _unsuccessfulResponse({
              isSuccess: false,
              path: "folderCreatorDefs/handleUnauthenticatedRequest",
              type: "Error",
              msg: "you are not login and this is not a sample class.",
            });
          }

          // ----------------------------------------------
          // handle authenticated request
          if (user) {
            const isOwnClass = await prisma.class.findMany({
              where: { id: args.classId },
            });

            if (!isOwnClass && !isSampleClass) {
              return _unsuccessfulResponse({
                isSuccess: false,
                path: "folderCreatorDefs/handleAuthenticatedRequest",
                type: "Error",
                msg: "this is not your own class and not a sample class as well.",
              });
            }
          }

          // -------------------------------------------
          // handle folder counts
          if (!isSampleClass) {
            const folderCounts = await ctx.prisma.folder.findMany({
              where: { userId: args.userId },
            });
            if (folderCounts.length > ENTITY_LIMIT)
              return _unsuccessfulResponse({
                isSuccess: false,
                path: "folderCreatorDefs/handleFolderCount",
                type: "Error",
                msg: "this is not your own class and not a sample class as well.",
              });
          }

          // =========================================
          // finally create folder

          const createdFolder = await ctx.prisma.folder.create({
            data: { ...args, sample: SAMPLE },
          });

          console.log(`folder created Successfully `, createdFolder);

          return createdFolder;
        } catch (error) {
          return _unsuccessfulResponse({
            isSuccess: false,
            path: "folderCreatorDefs/unHandledError",
            type: "Error",
            msg: String(error),
          });
        }
      },
    });
  },
});
