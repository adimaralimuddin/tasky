import React, { useState } from "react";
import { DownIcon, UpIcon } from "../../lib/icons";
import Box from "./Box";

type props = {
  options: any[][];
  onInput?: Function;
  text: string;
  css?: string;
  defaultValue?: any;
};
type Option = string[];

const options = [["biology", "mat val"], ["mathematic"], ["physics"]];
export default function Select({
  onInput,
  options,
  text,
  defaultValue,
  css,
}: props) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState<Option>(
    defaultValue != undefined ? defaultValue : options?.[0]
  );

  const onInputHandler = (option: Option) => {
    setVal(option);
    setOpen(false);
    onInput?.(option?.[1] || option?.[0]);
  };

  return (
    <div className={" " + css}>
      <p className="mx-2 whitespace-nowrap">{text}</p>
      <div>
        <p
          onClick={(_) => setOpen((p) => !p)}
          className="	 cursor-pointer hover:shadow-smd hover:ring-1 ring-slate-200 rounded-lg m-1 w-mind  p-2 bg-slate-100 min-w-[70px] flex items-center justify-between"
        >
          {val?.[0]?.toString()}
          {open ? <UpIcon /> : <DownIcon />}
        </p>
        {open && (
          <div className="relative z-20">
            <Box css=" shadow-xl ring-1 ring-slate-200 absolute top-0 left-0 p-0 overflow-hidden min-w-[80px] ">
              {options?.map((option) => (
                <div
                  onClick={(_) => onInputHandler(option)}
                  className="hover:bg-slate-100 cursor-pointer px-4 p-1"
                >
                  {option[0]?.toString()}
                </div>
              ))}
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}
