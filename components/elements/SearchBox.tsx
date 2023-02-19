import React from "react";
import { CgSearch } from "react-icons/cg";

export default function SearchBox({ css, children, ...props }: any) {
  return (
    <div
      className={
        "bg-white dark:bg-slate-600 items-center px-2 rounded-xl overflow-hidden flex " +
        css
      }
    >
      <CgSearch />
      <input
        {...props}
        type="text"
        className={
          "bg-transparent placeholder-gray-400 text-gray-600 text-sm cursor-text  m-0 flex-1 outline-none " +
          props?.inputCss
        }
        placeholder={props?.placeholder || "search..."}
      />
      {children}
    </div>
  );
}
