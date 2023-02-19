import Image from "next/image";
import React from "react";

interface AppLogotype {
  showTitle?: boolean;
}
export default function AppLogo({ showTitle = true }: AppLogotype) {
  return (
    <div className="p-1 flex_ items-center hover:scale-[1.3]d transitiond dhover:rotate-[360deg] dduration-[2s] ">
      <Image
        className=""
        src={`/my_logo.png`}
        width={40}
        height={40}
        alt="tasky logo"
      />
      {showTitle ? (
        <h2 className="text-cyan-700 font-bold  ">TaskCard</h2>
      ) : null}
    </div>
  );
}
