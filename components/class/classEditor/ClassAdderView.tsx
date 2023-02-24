import React from "react";
import { FaPlus } from "react-icons/fa";

function ClassAdderView() {
  return (
    <div>
      <small>0 class left!</small>
      <div className="flex_ items-center cursor-pointer text-indigo-500 ">
        <FaPlus />
        <p className="font-bold text-smd">New Class</p>
      </div>
    </div>
  );
}

export default ClassAdderView;
