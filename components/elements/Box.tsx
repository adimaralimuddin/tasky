import React from "react";

export default function Box({ css, ...props }: any) {
  return (
    <div
      className={
        "p-3 m-1 bg-white shadow-sm dark:bg-slate-700 rounded-xl   " + css
      }
      {...props}
    >
      {props?.children}
    </div>
  );
}
