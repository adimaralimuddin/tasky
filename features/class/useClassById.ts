import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../lib/public";
import { ClassType } from "./classTypes";

function useClassById(classId: string | undefined) {
  const classById = useQuery(
    ["class", classId],
    async () => await classApiGetClass(classId)
  );
  return {
    ...classById,
  };
}

export default useClassById;

export async function classApiGetClass(
  id: string | undefined
): Promise<ClassType> {
  const q = gql`
    query Class($id: String!) {
      class(id: $id) {
        id
        name
        description
        sample
        userId
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
