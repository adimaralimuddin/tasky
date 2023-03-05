// import Link from "next/link";
import React, { useState } from "react";
import { OptionIcon } from "../../lib/icons";
import Box from "./Box";

type props = {
  Icon?: any;
  options: {
    text: string;
    icon?: any;
    action?: any;
    link?: any;
  }[];
  left?: boolean;
};

export default function Option({
  Icon = <OptionIcon className="text-lg" />,
  options,
  left = false,
}: props) {
  const [open, setOpen] = useState(false);
  return (
    <div className="">
      <div
        onClick={(e) => {
          setOpen((p) => !p);
          e.stopPropagation();
        }}
        className="text-prime  p-1 rounded-full hover:shadow-mdd cursor-pointer hover:scale-[1.2] transition-all duration-300 dark:text-slate-100d "
      >
        {Icon}
      </div>
      {open && (
        <div className="relative z-20   ">
          <div
            onClick={(e: React.FormEvent) => e.stopPropagation()}
            className={
              "card-all animate-pop absolute top-1 ring-1 ring-slate-200d p-2 overflow-hidden shadow-lg  " +
              (left && "right-0")
            }
          >
            <div>
              {options?.map((option) => {
                return (
                  <div
                    onClick={(_) => {
                      option?.action?.();
                      setOpen?.(false);
                    }}
                    key={option.text}
                    className="cursor-pointer flex items-center hover:bg-slate-100 dark:hover:bg-slate-500 dark:text-slate-200 p-2 rounded-md "
                  >
                    {option?.icon}
                    <small className="ml-2 whitespace-nowrap">
                      {option?.text}
                    </small>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
