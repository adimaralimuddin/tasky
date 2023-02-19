import React from "react";

function TextLoader(props: any) {
  return (
    <div
      className={
        "flex-1 p-2 rounded-lg bg-slate-200 dark:bg-slate-600   " +
        props?.className
      }
    ></div>
  );
}

export default TextLoader;
