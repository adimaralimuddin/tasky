import React from "react";
import TextLoader from "../../../elements/TextLoader";

function CardItemLoader(props: any) {
  return (
    <div
      className={
        "bg-slate-100 dark:bg-slate-700 p-3 flex flex-col gap-3 rounded-xl min-h-[80px] flex-1 max-w-[150px] justify-center " +
        props?.className
      }
      {...props}
    >
      <div className="flex_ ">
        <TextLoader className="flex-none max-w-[20px]" />
        <TextLoader className="flex- max-w-[60px]" />
      </div>
      <TextLoader className=" flex-none" />
    </div>
  );
}

export default CardItemLoader;
