import React from "react";

function BtnPrime(p: any) {
  return (
    <button
      {...p}
      className={
        "bg-indigo-400 dark:bg-indigo-500 font-semibold text-white flex items-centerd gap-2  justify-centerd hover:ring-2 ring-indigo-200 dark:ring-indigo-400 " +
        p.css
      }
    >
      {p.children}
    </button>
  );
}

export default BtnPrime;
