import React, { useState } from "react";
import Box from "../elements/Box";
import Select from "../elements/Select";

type props = {
  optionCount: number;
  setOptionCount: any;
  side: string;
  setSide: any;
  singleWrong: boolean;
  setSingleWrong: Function;
  speed: number;
  setSpeed: Function;
};

export default function QuizOptions({
  optionCount,
  setOptionCount,
  side,
  setSide,
  singleWrong,
  setSingleWrong,
  speed,
  setSpeed,
}: props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <p
        onClick={() => setOpen((p) => !p)}
        className="ring-1 rounded-lg ring-slate-300 px-2 hover:shadow-lg cursor-pointer"
      >
        Quiz Options
      </p>
      {open && (
        <span className="relative z-10">
          <div className="absolute">
            <Box css="shadow-xl ring-1 ring-slate-300">
              <Select
                defaultValue={[optionCount]}
                options={[[2], [3], [4], [5], [6]]}
                onInput={(optCount: number) => setOptionCount(optCount)}
                text="option counts"
                css="flex items-center justify-between"
              />
              <Select
                defaultValue={[side]}
                options={[["fronts"], ["backs"]]}
                onInput={(side_: string) => setSide(side_)}
                text="starting side"
                css="flex items-center justify-between"
              />
              <Select
                defaultValue={[singleWrong]}
                text="single Wrong"
                options={[[false], [true]]}
                onInput={(val: any) => setSingleWrong(val)}
                css="flex items-center justify-between"
              />
              <Select
                text="pause duration"
                options={[[0.1], [0.2], [0.5], [0.7], [1], [1.5], [2], [2.5]]}
                defaultValue={[speed]}
                onInput={(val: any) => setSpeed([val])}
                css="flex items-center justify-between"
              />
            </Box>
          </div>
        </span>
      )}
    </div>
  );
}
