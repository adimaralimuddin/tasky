import Image from "next/image";
import React from "react";

interface AppLogotype {
  showTitle?: boolean;
}
export default function AppLogo({ showTitle = true }: AppLogotype) {
  return (
    <div className=" flex_ items-center min-w-[32px] min-h-[32px]   ">
      <Image src={`/my_logo.png`} width={35} height={35} alt="tasky logo" />
      {showTitle ? (
        <h2 className="text-cyan-700 font-bold  ">TaskCard</h2>
      ) : null}
    </div>
  );
}
