import React from "react";
import { CategoryType } from "../../features/app/appSlice";
import useContentSetter from "../../features/app/contents/useContentSetter";
import { DownIcon } from "../../lib/icons";

interface Props {
  category: CategoryType;
}
function PlayButton({ category }: Props) {
  const { setContent } = useContentSetter();

  const onJustPlay = () => {
    setContent("play", category);
  };

  return (
    <div className=" bg-sec flex hover:ring-2 ring-indigo-200 bg-[#ECFFF8]   dark:ring-slate-400 text-sm text=-white rounded-xl min-w-[90px] text-center ">
      <h4
        className="text-[#4A9F80] dark:text-[#A4B3E2] p-1 px-3 flex-1 font-bold text-center "
        onClick={(e) => {
          e.stopPropagation();
          onJustPlay();
        }}
      >
        Play
      </h4>
      {/* <span className=" col_ justify-center px-2 text-whited ">
          <DownIcon />
        </span> */}
    </div>
  );
}

export default PlayButton;
