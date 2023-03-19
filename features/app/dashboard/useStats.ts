import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../../lib/public";
import useServerState from "../../dateState/useServerState";

function useStats() {
  const { class_ } = useServerState();
  const classId = class_?.id;
  const stats = useQuery(["stats", classId], () => statsApi({ classId }), {
    onSuccess(data) {
    },
    onError(err) {
      console.log(`stats err`, err);
    },
  });
  return { ...stats };
}

export default useStats;

const statsApi = async ({ classId }: { classId: string }) => {
  const q = gql`
    query Query($classId: String!) {
      stats(classId: $classId) {
        normalCards
        normal
        time
        hardCards
        hard
        easyCards
        easy
        classId
      }
    }
  `;

  const res = await request(DBURL, q, { classId });
  return res?.stats;
};
