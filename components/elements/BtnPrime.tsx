import React from "react";

function BtnPrime(p: any) {
  return (
    <button
      {...p}
      className={
        "bg-indigo-400 font-semibold text-white flex items-center justify-center hover:ring-2 ring-indigo-200 " +
        p.css
      }
    >
      {p.children}
    </button>
  );
}

export default BtnPrime;
