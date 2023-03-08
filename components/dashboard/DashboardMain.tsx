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
  const { class_, folders } = useServerState();

  const topics = (): TopicType[] =>
    folders?.reduce(
      (topics, folder) => [...topics, ...(folder.Topic || [])] as any,
      []
    );

  return (
    <div className=" max-w-4xl ">
      {/* <h3 className="title_ pb-2 font-semibold text-sec ">Dashboard</h3> */}
      <div className="card card-ring card-shadow gap-[5%] flex flex-wrap justify-between   rounded-2xl px-[5%] py-3   m-r-auto">
        <div>
          <h2 className="font-bold text-prime">{class_?.name}</h2>
          <div className="flex_ font-thin pt-2 text-accent">
            <p>folders {folders?.length}</p>
            <p>topics {topics()?.length}</p>
            <p>cards {total}</p>
          </div>
          <div className="text-value flex gap-6 pt-3 animate-pop">
            <span className=" col_ gap-1 items-center ring-1d p-2  ring-slate-200">
              <Pie value={40} bar_l="#5CD2CB" />
              <p>Progress</p>
            </span>
            <span className="col_ gap-1 items-center p-2  ring-slate-200">
              <Pie value={40} bar_l="#F37C7C" />
              <p>Remaining</p>
            </span>
          </div>
        </div>
        <GraphBar />
      </div>
    </div>
  );
}

export default DashboardMain;
