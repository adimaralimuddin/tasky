import React, { useEffect, useState } from "react";
import { DownIcon, UpIcon } from "../../lib/icons";
import _charLimits from "../../lib/utils/_charLimits";
import Box from "./Box";

type props = {
  options: any[][];
  onInput?: (val: any) => any;
  text?: string;
  css?: string;
  defaultValue?: any;
  value?: any;
  icon?: any;
  className?: string;
};
type Option = string[];

const options = [["biology", "mat val"], ["mathematic"], ["physics"]];
export default function Select({
  onInput,
  options,
  text,
  defaultValue,
  css,
  value,
  icon,
  className,
  ...props
}: props) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState<Option>(options?.[0]);
  const maxVarChar = 20;

  useEffect(() => {
    setVal(options?.find((p) => p[1] == value) || options?.[0]);
  }, [value]);

  const onInputHandler = (option: Option) => {
    setVal(option);
    setOpen(false);
    onInput?.(option?.[1] || option?.[0]);
  };

  return (
    <div className={"flex  items-center " + css}>
      <small className={" flex-1 whitespace-nowrap " + (text && " pr-2 ")}>
        {text}{" "}
      </small>
      <div>
        <p
          {...props}
          onClick={(_) => setOpen((p) => !p)}
          className={
            "	text-sm cursor-pointer hover:shadow-smd ring-1 ring-slate-200 hover:ring-slate-300 dark:ring-slate-600 dark:hover:ring-slate-500 rounded-lg p-1 bg-white dark:bg-slate-600 min-w-[70px] flex items-center justify-between gap-2  " +
            className
          }
        >
          {icon ? icon : null}
          <span className="text-center  flex-1">{val?.[0]?.toString()}</span>
          {open ? <UpIcon /> : <DownIcon />}
        </p>
        {open && (
          <div className="relative z-20">
            <Box css=" shadow-xl ring-1 ring-slate-200 absolute top-0 left-0 overflow-hidden min-w-[80px] dark:ring-2 dark:ring-slate-500 ">
              {options?.map((option) => (
                <div
                  title={
                    option[0]?.toString()?.length > maxVarChar
                      ? option[0]?.toString()
                      : ""
                  }
                  key={option?.[0]?.toString()}
                  onClick={(_) => onInputHandler(option)}
                  className="hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer px-4 p-1 text-sm rounded-md whitespace-nowrap "
                >
                  {_charLimits(option[0]?.toString(), maxVarChar)}
                </div>
              ))}
            </Box>
          </div>
        )}
      </div>
    </div>
  );
}
