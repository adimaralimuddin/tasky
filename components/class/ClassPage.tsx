import React from "react";
import useClassHooks from "../../hooks/useClassHooks";
import LayoutMainHeader from "../layouts/LayoutMainHeader";
import ClassAdder from "./ClassAdder";
import ClassItem from "./ClassItem";
import { ClassType } from "./classTypes";

function PageMainClass({ defClass }: any) {
  const {
    classes: { data },
    sampleClasses: { data: sampleClasses },
  } = useClassHooks();

  return (
    <div className="min-h-screen dark:bg-slate-800">
      <LayoutMainHeader />
      <div className="p-5 flex gap-3 flex-wrap content-center justify-center max-w-5xl mx-auto">
        <ClassAdder />

        {sampleClasses?.map((data: ClassType) => (
          <ClassItem data={data} editable={false} key={data?.id} />
        ))}

        {data?.map((data: ClassType) => (
          <ClassItem data={data} key={data?.id} />
        ))}
      </div>
    </div>
  );
}

export default PageMainClass;
