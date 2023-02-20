import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { CardUrl } from "./cardApi";

export default function useDashboard(classId: string | string[] | undefined) {
  const dashboard = useQuery(["dashboard", classId], () =>
    cardApiDashboard(classId)
  );

  return {
    dashboard,
  };
}

export async function cardApiDashboard(classId: any) {
  //id = classid
  if (!classId) return console.log("no classid", classId);
  const q = gql`
    query Query($classId: String!) {
      dashboard(classId: $classId) {
        level
        category
        _count {
          id
        }
      }
    }
  `;
  const ret = await request(CardUrl, q, { classId });
  return ret.dashboard;
}
