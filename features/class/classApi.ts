import request, { gql } from "graphql-request";
export const ClassUrl = "/api/graphql";

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
