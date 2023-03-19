import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { useRouter } from "next/router";
import { dashType } from "../../components/dashboard/DashboardMainContent";
import { DashboardType } from "../app/appSlice";
import useClassGetter from "../class/useClassGetter";
import useServerState from "../dateState/useServerState";
import { CardUrl } from "./cardApi";

export default function useDashboard() {
  // const { class_ } = useServerState();
  const class_ = useClassGetter().getClass();
  const { query } = useRouter();

  const classId = class_?.id || String(query?.classId);
  const dashboard = useQuery<DashboardType[]>(
    ["dashboard", classId],
    () => cardApiDashboard(classId),
    {
      onSuccess(data) {},
      onError(err) {
        console.log(
          `Error:
        @useDashboard
        msg: = `,
          err
        );
      },
    }
  );

  const getTotal = () => {
    const total = dashboard?.data?.reduce(
      (total: number, d: dashType) => total + d._count.id,
      0
    );
    return total || 0;
  };

  return {
    dashboard,
    ...dashboard,
    getTotal,
  };
}

export async function cardApiDashboard(classId: any): Promise<DashboardType[]> {
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
