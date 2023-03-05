import dynamic from "next/dynamic";
import React from "react";
import Popy from "../elements/Popy";
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
    <div className=" flex flex-col gap-0  ">
      <LayoutMainHeader />
      <div className="container max-w-4xl mx-auto col_ gap-0 py-[3%] flex-1 ">
        <div className="flex_ justify-end">
          <DynamicClassAdder myClasses={myClasses} />
        </div>
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
