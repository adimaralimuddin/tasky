import { useEffect } from "react";
import useClientState from "../../features/dateState/useClientState";
import useServerState from "../../features/dateState/useServerState";
import WorkContent from "./workContent/WorkContent";
import WorkHeader from "./workHeader/WorkHeader";
import WorkSide from "./WorkSide/WorkSideMain";

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
