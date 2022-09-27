import React from "react";
import useClass from "../../features/class/useClass";
import useClassHooks from "../../hooks/useClassHooks";
import LayoutMainHeader from "../layouts/LayoutMainHeader";
import ClassAdder from "./ClassAdder";
import ClassItem from "./ClassItem";
import { ClassType } from "./classTypes";

function PageMainClass() {
  const {
    classes: { data },
  } = useClassHooks();
  const {
    userClass: { data: defaultClass },
  } = useClass(process.env.NEXT_PUBLIC_DEF_CLASS);

  return (
    <div className="min-h-screen dark:bg-slate-800">
      <LayoutMainHeader />
      <div className="p-5 flex gap-3 flex-wrap content-center justify-center max-w-5xl mx-auto">
        <ClassAdder />
        <ClassItem data={defaultClass} />
        {data?.map((data: ClassType) => (
          <ClassItem data={data} key={data?.id} />
        ))}
      </div>
    </div>
  );
}

export default PageMainClass;
