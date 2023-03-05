import Image from "next/image";
import React from "react";

export default function Icon({ size = 20, divProps, ...props }: any) {
  return (
    <div
      {...divProps}
      className={
        "  rounded-full p-2d flex items-center hover:bg-slate-200 cursor-pointer hover:shadow-md " +
        props?.className
      }
    >
      <Image
        className={"" + props?.className}
        {...props}
        width={size}
        height={size}
        objectFit="fill"
        alt="icon"
      />
    </div>
  );
}
