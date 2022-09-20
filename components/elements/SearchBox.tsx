import React from "react";

export default function SearchBox({ css, children, ...props }: any) {
  return (
    <div className={"bg-slate-100 rounded-xl overflow-hidden flex " + css}>
      <input
        {...props}
        type="text"
        className={
          "bg-transparent ring-1 rounded-none m-0 flex-1 outline-none " +
          props?.inputCss
        }
        placeholder={props?.placeholder || "search..."}
      />
      {children}
    </div>
  );
}
