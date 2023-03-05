import React, { useState } from "react";
import useContentSetter from "../../features/app/contents/useContentSetter";
import { DownIcon, PlusBig, QuizIcon, UpIcon } from "../../lib/icons";
import Box from "./Box";

export default function ActionButtons() {
  const [open, setOpen] = useState(false);

  const { setContent } = useContentSetter();

  const onQuizHandler = () => {
    setContent("quiz");
    setOpen(false);
  };

  const onAddHandler = () => {
    setContent("cardadder");
    setOpen(false);
  };

  return (
    <div className=" flex flex-col">
      <div className="ring-d flex btn-prime  rounded-lg overflow-hidden my-1 dark:ring-0 dark:hover:ring-2 dark:hover:ring-[#7f95d2]">
        <p
          onClick={(_) => setContent("play")}
          className="px-3 p-1 cursor-pointer first-letter:"
        >
          Play
        </p>
        <div
          onClick={(_) => setOpen((p) => !p)}
          className="flex items-center px-2 cursor-pointer 
          bg-white dark:bg-layer-100 text-indigo-400"
        >
          {open ? <UpIcon /> : <DownIcon />}
        </div>
      </div>
      {open && (
        <span className="relative z-20">
          <Box css="ring-1 ring-slate-200 shadow-lg absolute top-0 left-0 min-w-full mx-0 dark:bg-slate-600 dark:shadow-2xl">
            <Item onClick={onQuizHandler} Icon={<QuizIcon />}>
              Quiz
            </Item>
            <Item onClick={onAddHandler} Icon={<PlusBig />}>
              Card
            </Item>
          </Box>
        </span>
      )}
    </div>
  );
}

function Item({ children, Icon, onClick, ...props }: any) {
  return (
    <p
      onClick={onClick}
      {...props}
      className="cursor-pointer flex items-center gap-2 p-1 hover:bg-slate-100 dark:hover:bg-slate-500 rounded-lg px-2 "
    >
      {Icon}
      {children}
    </p>
  );
}
