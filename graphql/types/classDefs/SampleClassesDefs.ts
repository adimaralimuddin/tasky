import { extendType } from "nexus";

export const SampleClasses = extendType({
  type: "Query",
  definition(t) {
    t.list.field("sampleClasses", {
      type: "Class",
      resolve(par_, arg_, ctx) {
        return ctx.prisma.class.findMany({
          where: { sample: true },
        });
      },
    });
  },
});
