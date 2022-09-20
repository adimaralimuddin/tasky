import { useQuery } from "@tanstack/react-query";
import { cardApiDashboard } from "./cardApi";

export default function useDashboard(userId: string) {
  const dashboard = useQuery(["dashboard", userId], () =>
    cardApiDashboard(userId)
  );

  return {
    dashboard,
  };
}
