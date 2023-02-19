import React from "react";
import useSampleClasses from "../../../features/class/useSampleClasses";
import ClassItem from "../ClassItem";
import ClassLists from "./ClassLists";

function ClassSamples({ title = "Classes" }: { title: string }) {
  const { data } = useSampleClasses();

  return <ClassLists data={data} title={title} editable={false} />;
}

export default ClassSamples;
