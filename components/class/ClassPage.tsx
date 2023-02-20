import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { FaPlus } from "react-icons/fa";
import LayoutHeader from "../layouts/LayoutHeader";
import ClassAdderView from "./classEditor/ClassAdderView";
import Classes from "./classlists/Classes";
// import ClassListLoader from "./classlists/ClassListLoader";
import ClassSamples from "./classlists/ClassSamples";

// const DynamicClasses = dynamic(() => import("./classlists/Classes"), {
//   ssr: false,
//   loading: ClassListLoader,
// });
// const DynamicClassSamples = dynamic(() => import("./classlists/ClassSamples"), {
//   ssr: false,
//   loading: ClassListLoader,
// });

const DynamicClassAdder = dynamic(() => import("./classEditor/ClassAdder"), {
  ssr: false,
  loading: ClassAdderView,
});


function PageMainClass() {
  return (
    <div className="min-h-screen dark:bg-slate-800 flex flex-col ">
      <LayoutHeader />
      <div className="container py-[1rem]  mx-auto flex-col px-[5%] dring-1 flex-1 ">
        <DynamicClassAdder />
        <br />
        <Classes title="My Classes" />
        <br />
        <ClassSamples title="Sample Classes" />
      </div>
    </div>
  );
}

export default PageMainClass;
