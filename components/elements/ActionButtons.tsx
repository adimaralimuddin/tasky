import React, { useState } from "react";
import useContentSetter from "../../features/app/contents/useContentSetter";
import { DownIcon, PlusBig, QuizIcon, UpIcon } from "../../lib/icons";
import Box from "./Box";
import Popy from "./Popy";

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
    <Popy
      open={open}
      setOpen={setOpen}
      header={
        <div
          className={
            " flex btn-prime  rounded-lg overflow-hidden my-1 dark:hover:ring-2 dark:hover:ring-[#7f95d2] " +
            (open && " ring-2 ring-slate-300 dark:ring-[#606f9a] ")
          }
        >
          <p
            onClick={(_) => setContent("play")}
            className="px-3 p-1 cursor-pointer flex-1"
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
      }
    >
      <div className="card-all col_ gap-0">
        <Item onClick={onQuizHandler} Icon={<QuizIcon />}>
          Quiz
        </Item>
        <Item onClick={onAddHandler} Icon={<PlusBig />}>
          Card
        </Item>
      </div>
    </Popy>
  );
}

function Item({ children, Icon, onClick, ...props }: any) {
  return (
    <p
      onClick={onClick}
      {...props}
      className="cursor-pointer flex items-center gap-2 p-1 hover:bg-slate-100 dark:hover:bg-layer-sec rounded-lg px-2 "
    >
      {Icon}
      {children}
    </p>
  );
}
