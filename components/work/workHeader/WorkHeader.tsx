import React from "react";
import useClassGetter from "../../../features/class/useClassGetter";
import LayoutMainHeader from "../../layouts/LayoutMainHeader";

function WorkHeader() {
  const class_ = useClassGetter().getClass();
  return (
    <div className="bg-white  dark:bg-slate-900 p-3d flex_ items-center sticky top-0 shadow-sm z-[50] px-6d">
      {class_ && (
        <p className="flex_ items-center font-bold text-prime pl-2">
          {class_?.name}
        </p>
      )}
      <div className="flex-1">
        <LayoutMainHeader showTitle={false} />
      </div>
    </div>
  );
}

export default WorkHeader;
