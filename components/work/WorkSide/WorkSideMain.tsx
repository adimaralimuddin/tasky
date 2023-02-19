import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { RxDashboard } from "react-icons/rx";
// import useClass from "../../../features/class/useClass";
import useWork from "../../../features/work/useWork";
// import useWindowResize from "../../../lib/utils/_useWindowResize";
import AppLogo from "../../elements/AppLogo";
import TextLoader from "../../elements/TextLoader";
// import WorkSideFolders from "./WorkSideFolders";
// import TopicAdder from "../topic/topicEditor/TopicAdder";

const TopicAdder = dynamic(() => import("../topic/topicEditor/TopicAdder"), {
  ssr: false,
});
const FolderAdder = dynamic(
  () => import("../folder/folderEditor/FolderAdder"),
  { ssr: false }
);

const WorkSideFolders = dynamic(() => import("./WorkSideFolders"), {
  ssr: false,
  loading: () => (
    <div className="col_">
      <TextLoader />
      <TextLoader />
    </div>
  ),
});

type props = {
  classId?: string | any;
  defTempId: string;
};

export default function WorkSide<Type>() {
  const {
    query: { classId },
  } = useRouter();

  const { setContent } = useWork();
  const [open, setOpen] = useState(true);
  // const { collapsed } = useWindowResize(670);

  // const onSideBarClose = () => (collapsed ? setOpen(false) : null);

  const Content = (
    <div className={" rounded-xl flex-1 max-w-xs   " + (!open && " hidden")}>
      <header className="flex flex-col gap-2">
        <AppLogo />
        <div className="col_ ">
          <h3
            className="text-cyan-500ds dark:text-white cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 hover:text-cyan-600 px-3 self-start rounded-lg flex_ items-center"
            onClick={(_) => setContent("dashboard")}
          >
            <RxDashboard />
            Dashboard
          </h3>
        </div>
        <hr className="" />
        <FolderAdder classId={classId} />
      </header>
      <WorkSideFolders classId={String(classId)} />

      <TopicAdder />
    </div>
  );

  // const isCol = (a: any, b: any) => (collapsed ? a : b);
  return (
    <div className="flex-1  max-w-[270px] bg-white dark:bg-slate-700">
      <div className="sticky shadow-xl border-r border-slate-100 top-0 z-60 p-2 h-screen  ">
        {Content}
      </div>
    </div>
  );
}
