import { getSession } from "@auth0/nextjs-auth0";
import { extendType, nonNull, stringArg } from "nexus";
import { DEF_USERID, ENTITY_LIMIT, SAMPLE } from "../../../lib/public";
import { ContextType } from "../../context";

export const topicAdderDefs = extendType({
  type: "Mutation",
  definition(t) {
    t.field("addTopic", {
      type: "Topic",
      args: {
        id: nonNull(stringArg()),
        classId: nonNull(stringArg()),
        userId: stringArg(),
        name: nonNull(stringArg()),
        description: stringArg(),
        folderId: nonNull(stringArg()),
        templateId: nonNull(stringArg()),
      },
      async resolve(
        parentNotUseFul_,
        { classId, ...args },
        { req, res, prisma }: ContextType
      ) {
        try {
          const userSession = getSession(req, res);
          const isSampleClass = await prisma.class.findFirst({
            where: { id: classId, sample: true },
          });

          // ---------------------------------------------------
          //   handle unauthenticated request
          if (!userSession) {
            if (!isSampleClass) {
              console.log(
                `validate: 
                topic/graphql
                @addTopic
                msg: no user and not sample class`
              );
              return null;
            }
            args.userId = DEF_USERID;
          }

          // ---------------------------------------------------
          //  handle authenticated request
          if (userSession) {
            const isMyClass = await prisma.class.findFirst({
              where: { id: classId, userId: userSession.user.sub },
            });
            if (!isMyClass && !isSampleClass) {
              console.log(
                `validate: 
                @cardAdderDefs
                msg: not owns class and not sample class`
              );
              return null;
            }
          }

          // ----------------------------------------------------------
          //   handle records limits
          const topicsCount = await prisma.topic.findMany({
            where: { folderId: args.folderId },
          });

          if (topicsCount?.length >= ENTITY_LIMIT) {
            return null;
          }

          // ****************************************
          // finally create topic handler
          const createdTopic = await prisma.topic.create({
            data: { ...args, sample: SAMPLE },
            include: {
              Template: true,
            },
          });

          return createdTopic;
        } catch (error) {
          console.log(
            `Error:
            topicsAdderDefs
            msg:`,
            error
          );
          return null;
        }
      },
    });
  },
});
