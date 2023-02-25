import dynamic from "next/dynamic";
import React from "react";
import LayoutMainHeader from "../layouts/LayoutMainHeader";
import ClassAdderView from "./classEditor/ClassAdderView";
import Classes from "./classlists/Classes";
// import Classes from "./classlists/Classes";
import ClassLists from "./classlists/ClassLists";
// import ClassSamples from "./classlists/ClassSamples";

const DynamicClassAdder = dynamic(() => import("./classEditor/ClassAdder"), {
  ssr: false,
  loading: ClassAdderView,
});

function PageMainClass({ myClasses, sampleClasses }: any) {
  return (
    <div className="min-h-screen dark:bg-slate-800 flex flex-col ">
      <LayoutMainHeader />
      <div className="container max-w-5xl py-[1rem]  mx-auto flex-col px-[5%] dring-1 flex-1 ">
        <DynamicClassAdder myClasses={myClasses} />
        <br />
        <Classes serverClasses={myClasses} />
        <br />
        <ClassLists
          data={sampleClasses}
          title="Sample Classes"
          editable={false}
        />
      </div>
    </div>
  );
}

export default PageMainClass;
