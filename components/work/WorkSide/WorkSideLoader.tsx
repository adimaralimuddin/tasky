import React from "react";
// import { DownIcon } from "../../../lib/icons";
import TextLoader from "../../elements/TextLoader";

function WorkSideLoader() {
  return (
    <div className="flex-1 sticky top-0  col_ max-h-screen p-2 max-w-[260px] ">
      <TextLoader className="flex-none" />
      <Folder />
      <Folder />
      <Folder />
      <Folder />
    </div>
  );
}

const Folder = () => (
  <div className="flex_ my-1">
    {/* <TextLoader className="max-w-[30px]" /> */}
    <TextLoader className="flex-none" />
    <TextLoader className="flex-noned" />
    {/* <DownIcon /> */}
  </div>
);

export default WorkSideLoader;
