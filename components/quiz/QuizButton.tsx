import React from "react";
import { CategoryType } from "../../features/app/appSlice";
import useContentSetter from "../../features/app/contents/useContentSetter";
import { DownIcon } from "../../lib/icons";

interface Props {
  category: CategoryType;
}
function QuizButton({ category }: Props) {
  const { setContent } = useContentSetter();

  const onJustPlay = () => {
    setContent("quiz", category);
  };

  return (
    <div>
      <div className=" bg-[#E2F5FF] dark:bg-layer-sec flexd text-center hover:ring-2 ring-indigo-200  dark:ring-slate-400 text-sm text=-white rounded-xl dark:text-[#A4B3E2] min-w-[90px] ">
        <p
          className="font-semibold text-slate-600d p-1 text-[#5585a1] dark:text-[#A4B3E2]  "
          onClick={(e) => {
            e.stopPropagation();
            onJustPlay();
          }}
        >
          Quiz
        </p>
        {/* <span className=" col_ justify-center px-2 text-whited ">
          <DownIcon />
        </span> */}
      </div>
    </div>
  );
}

export default QuizButton;
