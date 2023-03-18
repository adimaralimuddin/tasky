import { objectType } from "nexus";

export const Template = objectType({
  name: "Template",
  definition(t) {
    t.string("id");
    t.string("name");
    t.string("userId");
    t.boolean("deleted");
    t.string("fronts");
    t.boolean("sample");
    //fronts
    t.field("fronts", {
      type: "String",
      resolve(par: any) {
        return JSON.stringify(par?.fronts);
      },
    });
    //backs
    t.field("backs", {
      type: "String",
      resolve(par: any) {
        return JSON.stringify(par?.backs);
      },
    });
  },
});
