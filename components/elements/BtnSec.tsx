import React from "react";

export default function BtnSec(p: any) {
  return (
    <button
      {...p}
      className={
        "bg-cyan-400 dark:bg-cyan-600 font-semibold text-white hover:ring-2 ring-cyan-300 ring-d2 " +
        p.css
      }
    >
      {p.children}
    </button>
  );
}
