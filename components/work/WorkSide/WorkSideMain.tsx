import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import { HiOutlinePlus } from "react-icons/hi";
import { RxDashboard } from "react-icons/rx";
import useContentSetter from "../../../features/app/contents/useContentSetter";
import AppLogo from "../../elements/AppLogo";
import BtnPrime from "../../elements/BtnPrime";
import WorkSideFolders from "./WorkSideFolders";

const TopicAdder = dynamic(() => import("../topic/topicEditor/TopicAdder"), {
  ssr: false,
});
const FolderAdder = dynamic(
  () => import("../folder/folderEditor/FolderAdder"),
  {
    ssr: false,
    loading: () => (
      <BtnPrime css="flex items-center mx-3">
        <HiOutlinePlus className="text-md " />
        <small className="whitespace-nowrap text-center">New Folder</small>
      </BtnPrime>
    ),
  }
);

export default function WorkSide({ post }: any) {
  const { setContent } = useContentSetter();
  const router = useRouter();
  const classId = String(router.query?.classId);

  const onDashBoardClick = () => setContent("dashboard");

  return (
    <div
      className={
        "flex-1 lg:max-w-[290px] sm:hover hover:min-w-[270px] lg:hover:w-full hover:fixed lg:hover:sticky left-0   max-w-[38px] overflow-hidden bg-whited dark:bg-slate-700d group w-[100%] sticky top-0 max-h-screen dark:bg-slate-900 z-[999] min-h-screen  dark:ring-2  bg-white shadow-md "
      }
    >
      <div className={" rounded-xl flex-1 max-w-xs  "}>
        <div className=" lg:hidden col_ items-center  group-hover:hidden p-3">
          <AppLogo showTitle={false} />
          <button className="bg-purple-400 p-[4px] rounded-xl">
            <RxDashboard className="text-xl text-white" />
          </button>
        </div>
        <header className="hidden lg:flex group-hover:flex  flex-col items-stretch">
          <div className="p-3 col_">
            <AppLogo />
            <h3
              onClick={onDashBoardClick}
              className="flex-1 ring-2 text-cyan-500ds dark:text-white cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-600 hover:text-cyan-600 px-3 self-start rounded-lg flex_ items-center"
            >
              <RxDashboard />
              Dashboard
            </h3>
          </div>
          <FolderAdder classId={classId} />
          <hr className="  dark:border-slate-500" />
        </header>

        <WorkSideFolders post={post} classId={String(classId)} />

        <TopicAdder />
      </div>
    </div>
  );
}
