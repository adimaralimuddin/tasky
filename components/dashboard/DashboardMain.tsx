import React from "react";
import { DashboardType } from "../../features/app/appSlice";
import useClass from "../../features/class/useClass";
import useServerState from "../../features/dateState/useServerState";
import { TopicType } from "../../features/topic/topicType";
import GraphBar from "../elements/GraphBar";
import Pie from "../elements/Pie";

interface Props {
  total: number;
  data: DashboardType[];
}
function DashboardMain({ total, data }: Props) {
  const { class_, folders } = useServerState();

  
  const topics = (): TopicType[] =>
    folders?.reduce(
      (topics, folder) => [...topics, ...(folder.Topic || [])] as any,
      []
    );

  return (
    <div className=" max-w-3xl">
      <h3 className="title_ pb-2 font-bold ">Dashboard</h3>
      <div className="card gap-[5%] flex flex-wrap justify-between   rounded-2xl px-[5%] py-3  ring-slate-200 ring-1 m-r-auto">
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
