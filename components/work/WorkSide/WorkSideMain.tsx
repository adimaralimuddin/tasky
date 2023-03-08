import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import useContentSetter from "../../../features/app/contents/useContentSetter";
import AppLogo from "../../elements/AppLogo";
import WorkSideFolders from "./WorkSideFolders";

const TopicAdder = dynamic(() => import("../topic/topicEditor/TopicAdder"), {
  ssr: false,
});
const FolderAdder = dynamic(
  () => import("../folder/folderEditor/FolderAdder"),
  {
    ssr: false,
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
        "flex-1 lg:max-w-[260px] sm:hover hover:min-w-[270px] lg:hover:w-full hover:fixed lg:hover:sticky left-0   max-w-[38px] overflow-hidden bg-whited dark:bg-slate-700d group w-[100%] sticky top-0 dark:bg-layer-50 z-[100] min-h-screen max-h-screen  dark:ring-2d  bg-white shadow-md  hover:z-[800]"
      }
    >
      <div className={" rounded-xl flex-1 max-w-xs  max-h-screen col_ gap-0 "}>
        <div className=" lg:hidden col_ items-center  group-hover:hidden p-3">
          <AppLogo showTitle={false} />
          <Image src="/icon/dashboard_icon.svg" width={20} height={20} />
        </div>
        <header className="hidden lg:flex group-hover:flex  flex-col items-stretch">
          <div className="p-3 col_">
            <AppLogo />
            <h4
              onClick={onDashBoardClick}
              className="flex-1 flex_ cursor-pointer text-prime font-semibold"
            >
              <Image src="/icon/dashboard_icon.svg" width={20} height={20} />
              Dashboard
            </h4>
          </div>
          <FolderAdder classId={classId} />
          <hr className="  dark:border-slate-600 mt-3" />
        </header>

        <WorkSideFolders post={post} classId={String(classId)} />

        <TopicAdder />
      </div>
    </div>
  );
}
