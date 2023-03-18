import { extendType, objectType, queryType, unionType } from "nexus";
export const DbResponse = objectType({
  name: "DbResponse",
  definition(t) {
    t.string("msg");
    t.boolean("isError");
  },
});
export const Test = objectType({
  name: "Test",
  definition(t) {
    // t.string("__typename");
    t.string("good");
  },
});

export const TestFailed = objectType({
  name: "TestFailed",
  definition(t) {
    // t.string("__typename");
    t.string("msg");
  },
});

const responseType = (...test: any) => {
  return unionType({
    name: "TestResponse",
    definition(t) {
      t.members("Test", ...test);
    },
    resolveType: (item) => {
      const res = item as { __typename: "Test" | "TestFailed" };
      return res.__typename;
    },
  });
};

export const TestResponse = responseType(TestFailed);

export const yyy = queryType({
  definition(t) {
    t.field("getTest", {
      type: TestResponse,
      resolve() {
        // return {
        //   __typename: "TestFailed",
        //   msg: "oh yeah please work",
        // };
        return {
          __typename: "Test",
          good: "super good",
        };
      },
    });
  },
});

// export const UserResponse = unionType({
//   name: "UserResponse",
//   description: "The type of the possible results from the user query",
//   definition(t) {
//     t.members();
//   },
//   resolveType: (item) => item.name,
// });

// export const testDefs = extendType({
//   type: "Mutation",
//   definition(t) {
//     t.field("getTest", {
//       type: TestFailed,
//       resolve() {
//         throw new Error("sucks");
//         return null;
//         return {
//           good: "sucks",
//         };
//       },
//     });
//   },
// });
