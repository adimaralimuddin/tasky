import React from "react";
import useDashboard from "../../features/card/useDashboard";
import DashboardCategoryItem from "./DashboardCategoryItem";
import DashboardLevelItem from "./DashboardLevelItem";
import DashboardMain from "./DashboardMain";

export type dashType = {
  level: string;
  category: string;
  _count: { id: number };
};

export default function DashboardMainContent() {
  const { data: dashboard, getTotal } = useDashboard();

  const total = getTotal();

  return (
    <div className="flex-1 col_ animate-fadein  container max-w-5xl mx-auto pt-4 ">
      <DashboardMain />
      <h4 className="subtitle_ ">
        cards by{" "}
        <span className="text-sec font-semibold text-lg px-1">Level</span>
      </h4>
      <div className="flex gap-7 flex-wrap ">
        <DashboardLevelItem
          total={total}
          data={dashboard}
          text="repeated"
          value="normal"
        />
        <DashboardLevelItem
          total={total}
          data={dashboard}
          text="remembered"
          value="easy"
        />
        <DashboardLevelItem
          total={total}
          data={dashboard}
          text="forgotten"
          value="hard"
        />
      </div>

      <h4 className="subtitle_ ">
        cards by{" "}
        <span className="text-sec font-semibold text-lg px-1">category</span>
      </h4>
      <div className="flex gap-7 flex-wrap">
        <DashboardCategoryItem
          data={dashboard}
          text="New"
          value="new"
          field="category"
          total={total}
        />
        <DashboardCategoryItem
          data={dashboard}
          text="Completed"
          value="passed"
          field="category"
          total={total}
        />
        <DashboardCategoryItem
          data={dashboard}
          text="Remaining"
          value="left"
          field="category"
          total={total}
        />
      </div>
    </div>
  );
}
