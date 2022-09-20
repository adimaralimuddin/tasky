import React, { useState } from "react";
import useWork from "../../features/work/useWork";
import { DownIcon, PlusBig, QuizIcon, UpIcon } from "../../lib/icons";
import Box from "./Box";

export default function ActionButtons() {
  const [open, setOpen] = useState(false);
  const { setContent } = useWork();

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
      <div className="ring-1 flex  rounded-lg overflow-hidden ring-indigo-400 my-1 bg-indigo-400 text-white">
        <p
          onClick={(_) => setContent("play")}
          className="px-3 hover:bg-indigo-300 cursor-pointer first-letter:"
        >
          Play
        </p>
        <div
          onClick={(_) => setOpen((p) => !p)}
          className="flex items-center px-2 cursor-pointer 
          bg-white "
        >
          {open ? <UpIcon /> : <DownIcon />}
        </div>
      </div>
      {open && (
        <span className="relative z-20">
          <Box css="ring-1 ring-slate-200 shadow-lg absolute top-0 left-0 min-w-full mx-0">
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
      className="cursor-pointer flex items-center gap-2 p-1 hover:bg-slate-100 rounded-lg px-2 "
    >
      {Icon}
      {children}
    </p>
  );
}
