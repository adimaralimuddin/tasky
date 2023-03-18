import { objectType } from "nexus";

export const DashboardStatsTypeDefs = objectType({
  name: "Stats",
  definition(t) {
    t.string("time");
    t.string("classId");
    t.int("easy");
    t.int("normal");
    t.int("hard");
    t.list.string("easyCards");
    t.list.string("normalCards");
    t.list.string("hardCards");
  },
});
