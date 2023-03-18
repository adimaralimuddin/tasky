import { useQueryClient } from "@tanstack/react-query";
import React from "react";
import useStats from "../../features/app/dashboard/useStats";
import useDashboard from "../../features/card/useDashboard";
import useServerState from "../../features/dateState/useServerState";
import { FolderType } from "../../features/folder/folderTypes";
import useFolders from "../../features/folder/useFolders";
import { TopicType } from "../../features/topic/topicType";
import DashBoardGraph from "./DashBoardGraph";

interface Props {}

function DashboardMain({}: Props) {
  const { getTotal } = useDashboard();
  const total = getTotal();
  const { class_ } = useServerState();
  const client = useQueryClient();
  const { data: folders } = useFolders(class_?.id);

  const { data: stats } = useStats();

  const topics = folders?.reduce((topics: TopicType[], folder: FolderType) => {
    const topic: TopicType[] | undefined = client.getQueryData([
      "topics",
      folder.id,
    ]);
    return [...topics, ...(topic || [])];
  }, []);

  return (
    <div className=" max-w-4xl ">
      <div className="col_  md:flex-row card card-ring card-shadow gap-[2%] justify-between   rounded-2xl px-[5%] py-3   m-r-auto">
        <div className="ring-1d">
          <h2 className="font-bold text-prime">{class_?.name}</h2>

          <div className="flex_ md:flex-col font-thin pt-2 text-accent">
            <p>folders {folders?.length}</p>
            <p>topics {topics?.length}</p>
            <p>cards {total}</p>
          </div>
        </div>
        <DashBoardGraph statsLists={stats} />
      </div>
    </div>
  );
}

export default DashboardMain;
