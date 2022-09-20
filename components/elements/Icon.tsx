import Image from "next/image";
import React from "react";

export default function Icon({
  size = 20,
  divProps,
  ...props
}: {
  divProps?: any;
  size?: number;
  src: string;
}) {
  return (
    <div
      {...divProps}
      className="ring-1 ring-slate-200 bg-slate-50  rounded-full p-2 flex items-center hover:bg-slate-200 cursor-pointer hover:shadow-md"
    >
      <Image
        {...props}
        width={size}
        height={size}
        objectFit="fill"
        alt="icon"
      />
    </div>
  );
}
