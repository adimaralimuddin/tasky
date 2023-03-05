import React from "react";
import { ClassType } from "../../../features/class/classTypes";
import useClasses from "../../../features/class/useClasses";
import ClassLists from "./ClassLists";

function Classes({ serverClasses }: { serverClasses: ClassType[] }) {
  const { data } = useClasses(serverClasses);
  return <ClassLists data={data} title={"my classes"} />;
}

export default Classes;
