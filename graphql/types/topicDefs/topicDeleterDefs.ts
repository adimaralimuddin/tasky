import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import { MdSignalCellularNull } from "react-icons/md";
import _getSampleClass from "../../../lib/utils/utilsDb/_dbGetSampleClass";
import { ContextType } from "../../context";

export const topicDeleterDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("deleteTopic", {
      type: "Topic",
      args: {
        userId: stringArg(),
        classId: nonNull(stringArg()),
        topicId: nonNull(stringArg()),
      },
      async resolve(par, args, ctx: ContextType) {
        const { userId, topicId, classId } = args;

        try {
          const topicToDelete = await ctx.prisma.topic.findFirst({
            where: { id: topicId, userId },
          });
          const user = getSession(ctx.req, ctx.res)?.user;
          const isSampleClass = await _getSampleClass(classId);

          if (user) {
            if (user.sub !== topicToDelete?.userId && !isSampleClass) {
              console.log(
                `Validate:
               @topicDeleterDefs
               msg: not owns topic and not a sample class`
              );
              return null;
            }
          }

          if (!user && !isSampleClass) {
            console.log(
              `Validate:
             @topicDeleterDefs
             msg: not authenticated and not a sample class.`
            );
            return null;
          }

          // if (topicToDelete?.sample) {
          //   console.log(
          //     `Validate:
          //    @topicDeleterDefs
          //    msg: topic is a sample, must not be deleted.`
          //   );
          //   return null;
          // }

          const deletedTopic = await ctx.prisma.topic.delete({
            where: { id: topicId },
            include: {
              cards: true,
            },
          });
          console.log(`topic deleted successfully!`);

          return deletedTopic;
        } catch (error) {
          console.log(
            `Error:  
        @topicDeleterDefs
        msg: `,
            error
          );

          return null;
        }
      },
    });
  },
});
