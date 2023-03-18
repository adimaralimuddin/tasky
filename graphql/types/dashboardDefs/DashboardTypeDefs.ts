import { objectType } from "nexus";

export const Dashboard = objectType({
  name: "Dashboard",
  definition(t) {
    t.field("_count", { type: Count });
    t.string("level");
    t.string("category");
  },
});

export const Count = objectType({
  name: "Count",
  definition(t) {
    t.int("id");
  },
});
