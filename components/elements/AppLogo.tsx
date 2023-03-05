import Image from "next/image";
import React from "react";

interface AppLogotype {
  showTitle?: boolean;
}
export default function AppLogo({ showTitle = true }: AppLogotype) {
  return (
    <div className=" flex_ items-center min-w-[32px] min-h-[32px]   ">
      <Image src={`/icon/logo.svg`} width={20} height={20} alt="tasky logo" />
      {showTitle ? (
        <h2 className=" text-prime font-extrabold ">QuizPizt</h2>
      ) : null}
    </div>
  );
}
