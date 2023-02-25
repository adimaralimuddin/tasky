import React from "react";
import { CgSearch } from "react-icons/cg";

export default function SearchBox({ css, children, ...props }: any) {
  return (
    <div
      className={
        "bg-white dark:bg-slate-600 items-center px-2 rounded-xl overflow-hidden flex ring-1 ring-slate-200 " +
        css
      }
    >
      <CgSearch />
      <input
        {...props}
        type="text"
        className={
          "bg-transparent  placeholder-gray-400 text-slate-600 dark:text-slate-300 text-[.85rem] cursor-text  m-0 flex-1 outline-none py-[.35rem] " +
          props?.inputCss
        }
        placeholder={props?.placeholder || "search..."}
      />
      {children}
    </div>
  );
}
