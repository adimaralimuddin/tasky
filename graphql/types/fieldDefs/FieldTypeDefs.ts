import { objectType } from "nexus";

export const Field = objectType({
  name: "Field",
  definition(t) {
    t.string("id");
    t.string("viewId");
    t.string("text");
    t.string("type");
    t.int("ind");
    t.string("value");
    t.string("frontId");
    t.string("backId");
  },
});
