import React from "react";

export default function BtnWarm(p: any) {
  return (
    <button
      {...p}
      className={
        "bg-pink-400 dark:bg-pink-500 hover:ring-2 ring-pink-200 font-semibold text-white " +
        p.css
      }
    >
      {p.children}
    </button>
  );
}
