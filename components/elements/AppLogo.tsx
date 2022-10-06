import React from "react";
import Image from "next/image";
export default function AppLogo() {
  return (
    <div className="p-1 hover:scale-[1.3] transition hover:rotate-[360deg] duration-[2s] ">
      <Image
        className=""
        src={`/my_logo.png`}
        width={40}
        height={40}
        alt="tasky logo"
      />
    </div>
  );
}
