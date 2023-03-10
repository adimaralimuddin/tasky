import React from "react";
import { DashboardType } from "../../features/app/appSlice";
import useServerState from "../../features/dateState/useServerState";
import { TopicType } from "../../features/topic/topicType";
import GraphBar from "../elements/GraphBar";
import Pie from "../elements/Pie";

interface Props {
  total: number;
}
function DashboardMain({ total }: Props) {
  const { class_, folders, dashboard } = useServerState();

  const topics = (): TopicType[] =>
    folders?.reduce(
      (topics, folder) => [...topics, ...(folder.Topic || [])] as any,
      []
    );

  const passed = dashboard.find((d) => d.category === "passed");
  const left = dashboard.find((d) => d.category === "left");
  const new_ = dashboard.find((d) => d.category === "new");

  // const res =
  //   ((passed?._count?.id - (new_?._count?.id + left?._count?.id) / 2) / total) *
  //   100;

  return (
    <div className=" max-w-4xl ">
      <div className="col_  md:flex-row card card-ring card-shadow gap-[2%] justify-between   rounded-2xl px-[5%] py-3   m-r-auto">
        <div className="ring-1d">
          <h2 className="font-bold text-prime">{class_?.name}</h2>
          <div className="flex_ md:flex-col font-thin pt-2 text-accent">
            <p>folders {folders?.length}</p>
            <p>topics {topics()?.length}</p>
            <p>cards {total}</p>
          </div>
          {/* <div className="text-value flex gap-6 pt-3 animate-pop">
            <span className=" col_ gap-1 items-center ring-1d p-2  ring-slate-200">
              <Pie value={Math.floor(res)} bar_l="#5CD2CB" />
              <p>Progress</p>
            </span>
            <span className="col_ gap-1 items-center p-2  ring-slate-200">
              <Pie value={40} bar_l="#F37C7C" />
              <p>Remaining</p>
            </span>
          </div> */}
        </div>
        <GraphBar />
      </div>
    </div>
  );
}

export default DashboardMain;
