import dynamic from "next/dynamic";
import React, { Suspense } from "react";
import { FaPlus } from "react-icons/fa";
import LayoutHeader from "../layouts/LayoutHeader";
import ClassAdderView from "./classEditor/ClassAdderView";
import ClassListLoader from "./classlists/ClassListLoader";

const DynamicClasses = dynamic(() => import("./classlists/Classes"), {
  ssr: false,
  loading: ClassListLoader,
});
const DynamicClassSamples = dynamic(() => import("./classlists/ClassSamples"), {
  ssr: false,
  loading: ClassListLoader,
});

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
        <DynamicClasses title="My Classes" />
        <br />
        <DynamicClassSamples title="Sample Classes" />
      </div>
    </div>
  );
}

export default PageMainClass;
