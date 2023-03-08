import React from "react";
import { BsBoundingBox } from "react-icons/bs";
import Icon from "../../elements/Icon";
import LayoutMainHeader from "../../layouts/LayoutMainHeader";

function WorkHeader({ serverState }: any) {
  return (
    <div className="bg-white  dark:bg-slate-900 p-3d flex_ items-center sticky top-0 shadow-sm z-50 px-6">
      <p className="flex_ items-center font-bold text-prime">
        {/* <Icon src="/icon/class_icon.svg" /> */}
        {serverState?.class_?.name}
      </p>
      <div className="flex-1">
        <LayoutMainHeader showTitle={false} />
      </div>
    </div>
  );
}

export default WorkHeader;
