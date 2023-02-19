import React from "react";
import { BsBoundingBox } from "react-icons/bs";
import LayoutHeader from "../../layouts/LayoutHeader";

function WorkHeader() {
  return (
    <div className="bg-white  dark:bg-slate-900 p-3d flex_ items-center sticky top-0 shadow-sm z-50 px-6">
      <p className="flex_ items-center font-bold">
        <BsBoundingBox className="text-2xl text-violet-400 " />
        Spanish 101
      </p>
      <div className="flex-1">
        <LayoutHeader />
      </div>
    </div>
  );
}

export default WorkHeader;
