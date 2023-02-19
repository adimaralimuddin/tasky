import React from "react";
import TextLoader from "../../elements/TextLoader";
import CardItemLoader from "../card/cardLoader/CardItemLoader";

function WorkContentLoader() {
  return (
    <div className="p-4 container max-w-5xl mx-auto col_ animate-pulse">
      <div className="min-h-[160px] bg-slate-200 dark:bg-slate-700 rounded-xl p-6 col_ justify-end">
        <div className="flex-1">
          <TextLoader className="max-w-[180px] dmin-h-[25px]" />
        </div>
        <div className="flex_">
          <TextLoader className="max-w-[120px] min-h-[25px]" />
          {/* <TextLoader className="max-w-[70px] min-h-[25px]" /> */}
        </div>
        <div className="flex_ justify-between">
          <TextLoader className="max-w-[260px] min-h-[20px]" />
          <TextLoader className="max-w-[70px] min-h-[20px]" />
        </div>
      </div>
      <br />
      <TextLoader className="max-w-[130px]" />
      <div className="flex flex-wrap gap-4">
        <CardItemLoader />
        <CardItemLoader />
        <CardItemLoader />
      </div>
      <br />
      <TextLoader className="max-w-[130px]" />
      <div className="flex flex-wrap gap-4">
        <CardItemLoader />
        <CardItemLoader />
        <CardItemLoader />
      </div>
    </div>
  );
}

export default WorkContentLoader;
