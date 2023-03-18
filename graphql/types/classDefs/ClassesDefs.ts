import { extendType } from "nexus";

export const Classes = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("classes", {
      type: "Class",
      resolve(par_, arg_, ctx) {
        return ctx.prisma.class.findMany({ where: { sample: false } });
      },
    });
  },
});
