// import prisma from "../lib/prisma";

export const resolvers = {
  Query: {
    users: async (_, arg, { prisma }) => {
      return await prisma.user.findMany({
        select: { id: true, name: true, email: true },
      });
    },
  },
};
