import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import _dbGetSampleClass from "../../../lib/utils/utilsDb/_dbGetSampleClass";
import { _unsuccessfulResponse } from "../../../lib/utils/utilsDb/_dbResponse";
import { _logDbResponse } from "../../../lib/utils/utilsLogger/_logDb";
import { ContextType } from "../../context";

export const folderRenamerDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("renameFolder", {
      type: "Folder",
      args: {
        userId: nonNull(stringArg()),
        classId: nonNull(stringArg()),
        folderId: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(par_, args, ctx: ContextType) {
        const { folderId, name, userId, classId } = args;
        const { prisma, req, res } = ctx;
        const user = getSession(req, res)?.user;
        const isSampleClass = await _dbGetSampleClass(classId);

        //   -----------------------
        // handle unauthenticated request
        if (!user && !isSampleClass) {
          return _unsuccessfulResponse({
            isSuccess: false,
            type: "Validate",
            path: "folderRenamerDefs",
            msg: "you are not authenticated and this folder is not on a sample class.",
          });
        }

        //   ------------------------------
        // handle authenticated request
        if (user) {
          const isMyFolder = await prisma.folder.findFirst({
            where: { id: folderId, userId: user.sub },
          });
          if (!isMyFolder && !isSampleClass) {
            return _unsuccessfulResponse({
              isSuccess: false,
              type: "Validate",
              path: "folderRenamerDefs",
              msg: "you do not own this folder and this folder is not on a sample class.",
            });
          }
        }

        //   -------------------------------
        // handle sample folder
        const currentFolder = await prisma.folder.findUnique({
          where: { id: folderId },
        });

        if (currentFolder?.sample) {
          return _unsuccessfulResponse({
            isSuccess: false,
            type: "Validate",
            path: "folderRenamerDefs",
            msg: "this folder is a sample folder and must not be renamed",
          });
        }

        // ********************************
        // finally, rename folder
        const renamedFolderResult: any = await ctx.prisma.folder.updateMany({
          where: { id: folderId, sample: false, },
          data: { name },
        });

        console.log(`folder renamed results: `, renamedFolderResult);

        return renamedFolderResult?.count !== 0 ? { id: folderId, name } : null;
      },
    });
  },
});
