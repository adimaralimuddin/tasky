import React from "react";

function ClassListLoader() {
  return (
    <div className="flex flex-col gap-3 animate-pulse">
      <p className="h-[15px]d p-3 max-w-[200px] rounded-lg  bg-slate-200"></p>
      <div className="flex flex-wrap gap-3">
        <div className="h-[150px] flex-1 bg-slate-200  rounded-xl"></div>
        <div className="h-[150px] flex-1 bg-slate-200  rounded-xl"></div>
        <div className="h-[150px] flex-1 bg-slate-200  rounded-xl"></div>
      </div>
    </div>
  );
}

export default ClassListLoader;
