import { extendType, nonNull, stringArg } from "nexus";
import { ENTITY_LIMIT, SAMPLE } from "../../../lib/public";

export const FolderCreatorDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("createFolder", {
      type: "Folder",
      args: {
        userId: nonNull(stringArg()),
        name: nonNull(stringArg()),
        classId: nonNull(stringArg()),
      },
      async resolve(par, data, ctx) {
        try {
          const folderCounts = await ctx.prisma.folder.findMany({
            where: { userId: data.userId },
          });

          if (folderCounts.length > ENTITY_LIMIT) return null;
          return ctx.prisma.folder.create({
            data: { ...data, sample: SAMPLE },
          });
        } catch (error) {
          console.log(`Error: folder/graphql : createFolder: `, error);

          return null;
        }
      },
    });
  },
});
