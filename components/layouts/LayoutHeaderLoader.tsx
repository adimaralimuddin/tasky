import React from "react";
import TextLoader from "../elements/TextLoader";

function LayoutHeaderLoader() {
  return (
    <div className="animate-pulse flex_">
      <h1>Tasky</h1>
      <div className="flex-1 flex_ ring-1 justify-center ">
        <TextLoader className="max-w-[100px]" />
        <TextLoader className="max-w-[100px]" />
      </div>
      <div>
        <div
          className="bg-slate-100 dark:bg-slate-600 rounded-full 
       min-h-[45px] aspect-square p-2"
        ></div>
      </div>
    </div>
  );
}

export default LayoutHeaderLoader;
