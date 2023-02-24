import dynamic from "next/dynamic";
import { useEffect } from "react";
import useClientState from "../../features/dateState/useClientState";
import useServerState from "../../features/dateState/useServerState";
import LayoutHeaderLoader from "../layouts/LayoutHeaderLoader";
import WorkContent from "./workContent/WorkContent";
import WorkSide from "./WorkSide/WorkSideMain";

const WorkHeader = dynamic(() => import("./workHeader/WorkHeader"), {
  ssr: false,
  loading: LayoutHeaderLoader,
});

export default function WorkPage({ post }: any) {
  const { initClientState } = useClientState();
  const { initServerState } = useServerState();

  useEffect(() => {
    initClientState(post);
    initServerState(post);
  }, []);

  return (
    <div className=" min-h-[100vh] flexd flex-col flex   ">
      <div className="flex flex-1">
        <WorkSide post={post} />
        <div className="flex-[3] flex flex-col border-b-1 shadow-sm ">
          <WorkHeader serverState={post} />
          <WorkContent serverState={post} />
        </div>
      </div>
    </div>
  );
}
