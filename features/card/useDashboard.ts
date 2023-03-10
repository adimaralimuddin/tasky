import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { dashType } from "../../components/dashboard/DashboardMainContent";
import { DashboardType } from "../app/appSlice";
import useServerState from "../dateState/useServerState";
import { CardUrl } from "./cardApi";

export default function useDashboard() {
  const { class_ } = useServerState();
  const classId = class_?.id;
  const dashboard = useQuery(["dashboard", classId], () =>
    cardApiDashboard(classId)
  );

  const getTotal = () => {
    const total = dashboard?.data?.reduce(
      (total: number, d: dashType) => total + d._count.id,
      0
    );
    return total || 0;
  };

  return {
    ...dashboard,
    getTotal,
  };
}

export async function cardApiDashboard(classId: any) {
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
