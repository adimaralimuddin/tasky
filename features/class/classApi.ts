import request, { gql } from "graphql-request";
import { ClassCreateType } from "../../components/class/classTypes";
export const ClassUrl = "/api/graphql";

// export const classApiSampleClass = async () => {
//   const q = gql`
//     query SampleClasses {
//       sampleClasses {
//         id
//         name
//         userId
//         description
//       }
//     }
//   `;
//   const res = await request(url, q);
//   return res?.sampleClasses;
// };

// export const classApiUserClass = async (userId?: string | any) => {
//   const q = gql`
//     query Query($userId: String!) {
//       userClasses(userId: $userId) {
//         id
//         name
//         userId
//         description
//       }
//     }
//   `;
//   const res = await request(ClassUrl, q, { userId });
//   return res?.userClasses;
// };

// export const classApiCreateClass = async ({
//   userId,
//   name,
//   description,
// }: ClassCreateType) => {
//   const q = gql`
//     mutation CreateClass(
//       $name: String!
//       $userId: String
//       $description: String
//     ) {
//       createClass(name: $name, userId: $userId, description: $description) {
//         id
//         name
//         description
//       }
//     }
//   `;
//   const ret = await request(ClassUrl, q, { userId, name, description });
//   return ret?.createClass;
// };

export async function classApiRenameClass({
  classId,
  name,
}: {
  classId: string;
  name?: string;
}) {
  const q = gql`
    mutation RenameClass($classId: String!, $name: String!) {
      renameClass(classId: $classId, name: $name) {
        id
        name
        userId
        description
      }
    }
  `;
  const ret = await request(ClassUrl, q, { classId, name });
  return ret.renameClass;
}

// export async function classApiUpdateClass(data: {
//   classId: string;
//   name: string;
//   description: string;
// }) {
//   const q = gql`
//     mutation UpdateClass(
//       $classId: String!
//       $name: String
//       $description: String
//     ) {
//       updateClass(classId: $classId, name: $name, description: $description) {
//         description
//         name
//         id
//       }
//     }
//   `;
//   const ret = await request(ClassUrl, q, data);
//   return ret.updateClass;
// }

// export async function classApiDeleteclass(classId: string) {
//   const q = gql`
//     mutation DeleteClass($classId: String!) {
//       deleteClass(classId: $classId) {
//         id
//         name
//         userId
//         description
//       }
//     }
//   `;
//   const ret = await request(ClassUrl, q, { classId });
//   return ret.deleteClass;
// }
