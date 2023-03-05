import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import useDashboard from "../../features/card/useDashboard";
import Pie from "../elements/Pie";
import DashboardCategoryItem from "./DashboardCategoryItem";
import DashboardLevelItem from "./DashboardLevelItem";
import DashboardMain from "./DashboardMain";

export type dashType = {
  level: string;
  category: string;
  _count: { id: number };
};

export default function DashboardMainContent({ serverState }: any) {
  const serverDashboards = serverState?.dashboard;

  const {
    query: { classId },
  } = useRouter();

  const { data: dashboard } = useDashboard(classId, serverDashboards);

  const total = dashboard?.reduce(
    (total: number, d: dashType) => total + d._count.id,
    0
  );

  return (
    <div className="flex-1 col_  px-[3%] container max-w-5xl mx-auto">
      <DashboardMain total={total} data={dashboard} />
      <h4 className="subtitle_ ">
        cards by{" "}
        <span className="text-slate-600 font-bold text-xl px-1">Level</span>
      </h4>
      <div className="flex gap-7 flex-wrap ">
        <DashboardLevelItem
          data={dashboard}
          text="learning"
          value="normal"
          total={total}
        />
        <DashboardLevelItem
          data={dashboard}
          text="remembered"
          value="easy"
          total={total}
        />
        <DashboardLevelItem
          data={dashboard}
          text="forgotten"
          value="hard"
          total={total}
        />
      </div>

      <h4 className="subtitle_ ">
        cards by{" "}
        <span className="text-slate-600 font-bold text-xl px-1">category</span>
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
