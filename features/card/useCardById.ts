import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../lib/public";

function useCardById(classId: string | undefined) {
  const classById = useQuery(
    ["class", classId],
    async () => await classApiGetClass(classId)
  );
  return { ...classById };
}

export default useCardById;

export async function classApiGetClass(id: string | undefined) {
  const q = gql`
    query Class($id: String!) {
      class(id: $id) {
        id
        name
        description
        sample
        folders {
          id
          name
        }
      }
    }
  `;
  const res = await request(DBURL, q, { id });
  return res?.class;
}
