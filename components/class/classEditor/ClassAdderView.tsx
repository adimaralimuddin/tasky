import React from "react";
import { FaPlus } from "react-icons/fa";

function ClassAdderView() {
  return (
    <div className="px-2 ">
      <div className="flex_ items-center cursor-pointer text-indigo-500d text-value ">
        <FaPlus />
        <p className="font-bold ">New Class</p>
      </div>
    </div>
  );
}

export default ClassAdderView;
