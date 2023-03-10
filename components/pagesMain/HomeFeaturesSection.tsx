import React from "react";

function HomeFeaturesSection() {
  return (
    <div className="py-2">
      <h1 className="text-[#63509A] dark:text-[#AFBCFB] text-[1.6rem] text-center font-bold">
        Features
      </h1>
      <div className="flex_  justify-center p-1">
        <span className="p-1.5 rounded-md bg-[#C5D0EB] min-w-[50px]"></span>
        <span className="p-1.5 rounded-md bg-[#C5D0EB] min-w-[10px]"></span>
        <span className="p-1.5 rounded-md bg-[#C5D0EB] min-w-[10px]"></span>
        <span className="p-1.5 rounded-md bg-[#C5D0EB] min-w-[10px]"></span>
      </div>
      <div className="min-h-[500px]"></div>
    </div>
  );
}

export default HomeFeaturesSection;
