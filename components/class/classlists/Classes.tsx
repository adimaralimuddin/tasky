import React from "react";
import useClasses from "../../../features/class/useClasses";
import ClassLists from "./ClassLists";

function Classes({ title }: { title: string }) {
  const { data } = useClasses();
  return <ClassLists data={data} title={title} />;
}

export default Classes;
