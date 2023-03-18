import React, { useState } from "react";
import { CgSearch } from "react-icons/cg";

export default function SearchBox({ css, children, ...props }: any) {
  const [foc, setFocus] = useState(false);
  return (
    <div
      className={
        "bg-white dark:bg-layer-sec shadow-sm items-center px-2 rounded-xl overflow-hidden flex flex-1 min-w-[200px] " +
        (foc && " ring-2 ring-slate-200 dark:ring-[#606f9a] ") +
        css
      }
    >
      <CgSearch />
      <input
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        {...props}
        type="text"
        className={
          "text-prime outline-none bg-transparent font-normal flex-1 px-2 py-[3px] p-0 m-0 " +
          props?.inputCss
        }
        placeholder={props?.placeholder || "search..."}
      />
      {children}
    </div>
  );
}
