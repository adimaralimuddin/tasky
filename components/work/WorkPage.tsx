import dynamic from "next/dynamic";
import LayoutHeaderLoader from "../layouts/LayoutHeaderLoader";
import WorkContentLoader from "./workContent/WorkContentLoader";
import WorkSideLoader from "./WorkSide/WorkSideLoader";

const WorkSide = dynamic(() => import("./WorkSide/WorkSideMain"), {
  ssr: false,
  loading: WorkSideLoader,
});
const WorkHeader = dynamic(() => import("./workHeader/WorkHeader"), {
  ssr: false,
  loading: LayoutHeaderLoader,
});
const WorkContent = dynamic(() => import("./workContent/WorkContent"), {
  ssr: false,
  loading: WorkContentLoader,
});

export default function WorkPage() {
  return (
    <div className=" min-h-[100vh] flexd flex-col flex   ">
      <div className="flex flex-1">
        <WorkSide />
        <div className="flex-[3] flex flex-col border-b-1 shadow-sm ">
          <WorkHeader />
          <WorkContent />
        </div>
      </div>
    </div>
  );
}
