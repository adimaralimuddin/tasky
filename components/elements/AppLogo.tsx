import Image from "next/image";
import Link from "next/link";
import React from "react";

interface AppLogotype {
  showTitle?: boolean;
  className?: string;
}
export default function AppLogo({ showTitle = true, className }: AppLogotype) {
  return (
    <Link href={"/"} prefetch={false}>
      <div className=" flex_ items-center min-w-[32px] min-h-[32px] cursor-pointer   ">
        <Image src={`/icon/logo.svg`} width={20} height={20} alt="tasky logo" />
        {showTitle ? (
          <h2 className={" text-prime font-extrabold " + className}>
            QuizPizt
          </h2>
        ) : null}
      </div>
    </Link>
  );
}
