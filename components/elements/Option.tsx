import React, { useState } from "react";
import { OptionIcon } from "../../lib/icons";
import Box from "./Box";

type props = {
  Icon?: any;
  options: { text: string; icon?: any; action?: any }[];
  left?: boolean;
};

export default function Option({
  Icon = <OptionIcon />,
  options,
  left = false,
}: props) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <div
        onClick={(e) => {
          setOpen((p) => !p);
          e.stopPropagation();
        }}
        className="hover:bg-slate-200 dark:hover:bg-slate-500  p-1 rounded-full hover:shadow-mdd cursor-pointer hover:scale-[1.2] transition-all duration-300 dark:text-slate-100"
      >
        {Icon}
      </div>
      {open && (
        <div className="relative z-20">
          <Box
            onClick={(e: React.FormEvent) => e.stopPropagation()}
            css={
              "dark:ring-slate-600 dark:bg-slate-600 absolute ring-1 ring-slate-200 p-2 overflow-hidden shadow-xl  " +
              (left && "right-0")
            }
          >
            <div>
              {options?.map((option) => (
                <div
                  onClick={(_) => {
                    option?.action();
                    setOpen?.(false);
                  }}
                  className="cursor-pointer flex items-center hover:bg-slate-100 dark:hover:bg-slate-500 dark:text-slate-200 p-2 rounded-md"
                  key={option.text}
                >
                  {option?.icon}
                  <small className="ml-2 whitespace-nowrap">
                    {option?.text}
                  </small>
                </div>
              ))}
            </div>
          </Box>
        </div>
      )}
    </div>
  );
}
