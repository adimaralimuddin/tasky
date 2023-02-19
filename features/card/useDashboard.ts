import { useQuery } from "@tanstack/react-query";
import { cardApiDashboard } from "./cardApi";

export default function useDashboard(classId: string | string[] | undefined) {
  const dashboard = useQuery(["dashboard", classId], () =>
    cardApiDashboard(classId)
  );

  return {
    dashboard,
  };
}
