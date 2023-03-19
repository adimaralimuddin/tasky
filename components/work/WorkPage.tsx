import Head from "next/head";
import { useEffect } from "react";
import useClientState from "../../features/dateState/useClientState";
import useServerState from "../../features/dateState/useServerState";
import WorkContent from "./workContent/WorkContent";
import WorkHeader from "./workHeader/WorkHeader";
import WorkSide from "./WorkSide/WorkSideMain";

export default function WorkPage({ pageInitialData }: any) {
  const { initClientState } = useClientState();
  const { initServerState } = useServerState();

  useEffect(() => {
    initClientState(pageInitialData);
    initServerState(pageInitialData);
  }, []);

  return (
    <div className=" min-h-screen flex-col flex   ">
      <Head>
        <title>{pageInitialData?.class_?.name}</title>
      </Head>
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
