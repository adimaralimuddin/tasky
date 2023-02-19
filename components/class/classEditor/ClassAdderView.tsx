import React from "react";
import { FaPlus } from "react-icons/fa";

function ClassAdderView() {
  return (
    <div className="flex_ items-center cursor-pointer text-indigo-500 ">
      <FaPlus />
      <p className="font-bold text-smd">New Class</p>
    </div>
  );
}

export default ClassAdderView;
