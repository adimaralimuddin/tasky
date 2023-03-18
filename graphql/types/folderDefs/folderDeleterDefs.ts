import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import _dbGetSampleClass from "../../../lib/utils/utilsDb/_dbGetSampleClass";

export const folderDeleterDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteFolder", {
      type: "Folder",
      args: {
        userId: stringArg(),
        classId: nonNull(stringArg()),
        id: nonNull(stringArg()),
      },
      async resolve(par, args, ctx) {
        const { id, userId, classId } = args;
        const { prisma, req, res } = ctx;
        const user = getSession(req, res)?.user;
        const isSampleClass = await _dbGetSampleClass(classId);

        try {
          //------------------------------
          // handle unauthenticated request
          if (!user) {
            if (!isSampleClass) {
              console.log(`Validate:
                @folderDeleterDefs
                msg: not authenticated and not a sample class`);
              return null;
            }
          }

          //   ------------------------------
          // handle authenticated request
          if (user) {
            const isMyFolder = await prisma.folder.findFirst({
              where: { id, userId: user.sub },
            });
            if (!isMyFolder && !isSampleClass) {
              console.log(`Validate:
            @folderDeleterDefs
            msg: not owns folder and not a sample class`);
              return null;
            }
          }

          //   -----------------------------
          // handle sample folder
          const currentFolder = await prisma.folder.findUnique({
            where: { id },
          });
          if (currentFolder?.sample) {
            console.log(`Validate:
            @folderDeleterDefs
            msg: this folder is a sample folder, and must not be deleted.`);
            return null;
          }

          //   ***********************
          // finally, delete the folder
          const folderDeletedResult = await ctx.prisma.folder.deleteMany({
            where: { id, sample: false },
          });
          console.log(`folder deletion result: `, folderDeletedResult);

          return folderDeletedResult?.count !== 0 ? { id } : null;
        } catch (error) {
          console.log(
            `Error:
            @folderDeleterDefs
            msg: `,
            error
          );
          return null;
        }
      },
    });
  },
});
