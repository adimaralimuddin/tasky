import React, { useEffect, useState } from "react";
import { clearTimeout } from "timers";
import { DownIcon, UpIcon } from "../../lib/icons";
import _charLimits from "../../lib/utils/_charLimits";
import Popy from "./Popy";

type props = {
  options: any[][];
  onInput?: (val: any) => any;
  text?: string;
  css?: string;
  value?: any;
  icon?: any;
  className?: string;
};
type Option = string[];

export default function Select({
  onInput,
  options,
  text,
  css,
  value,
  icon,
  className,
  ...props
}: props) {
  const [open, setOpen] = useState(false);
  const [val, setVal] = useState<Option>(options?.[0]);
  const maxVarChar = 20;
  let timer: any = null;

  useEffect(() => {
    setVal(
      options?.find((p) => p[0] == value || p[1] == value) || options?.[0]
    );
  }, [value]);

  const onInputHandler = (option: Option) => {
    setVal(option);
    setOpen(false);
    onInput?.(option?.[1] || option?.[0]);
  };

  return (
    <div className={"flex  items-center select-none  " + css}>
      <p
        className={
          " flex-1  whitespace-nowrap text-[.9rem]  text-phar  " +
          (text && " pr-2 ")
        }
      >
        {text}
      </p>
      <div>
        <Popy
          className="mt-3"
          header={
            <p
              className={
                " bg-layer-1  text-prime select-none	text-sm cursor-pointer hover:shadow-smd ring-1d ring-slate-200 hover:ring-slate-300 rounded-lg p-1 px-2  min-w-[70px] flex items-center justify-between gap-2 text-[.9rem] shadow-sm " +
                (open && " ring-2 dark:ring-[#606f9a] ") +
                className
              }
            >
              {icon ? icon : null}
              <span className="text-center  flex-1">
                {/* {value} */}
                {val?.[0]?.toString() || value}{" "}
              </span>
              {open ? <UpIcon /> : <DownIcon />}
            </p>
          }
          open={open}
          setOpen={setOpen}
        >
          <div className=" z-20">
            <input
              className="absolute max-h-0 p-0 top-0 left-0"
              onBlur={() => {
                if (timer !== null && timer !== undefined) {
                  clearTimeout(timer);
                }
                timer = setTimeout(() => {
                  setOpen(false);
                }, 150);
              }}
              type="text"
              autoFocus
            />
            <div
              onClick={(e) => e.stopPropagation()}
              className="card-all col_ gap-1"
            >
              {options?.map((option) => (
                <div
                  title={
                    option[0]?.toString()?.length > maxVarChar
                      ? option[0]?.toString()
                      : ""
                  }
                  key={option?.[0]?.toString()}
                  onClick={(_) => onInputHandler(option)}
                  className=" dark:hover:bg-layer-sec cursor-pointer px-4 p-2 text-sm rounded-lg hover:bg-slate-50 whitespace-nowrap min-w-[90px] text-center text-sec"
                >
                  {_charLimits(option[0]?.toString(), maxVarChar)}
                </div>
              ))}
            </div>
          </div>
        </Popy>
      </div>
    </div>
  );
}
