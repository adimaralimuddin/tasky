import React from "react";
import { ClassType } from "../../../features/class/classTypes";
import ClassItem from "../ClassItem";

export default function ClassLists({
  title = "Classes",
  data,
  editable,
}: {
  title: string;
  data: ClassType[];
  editable?: boolean;
}) {
  return (
    <div>
      <h3 className=" px-3 text-accent font-semibold pb-2">{title}</h3>
      <div className="flex flex-wrap gap-6 ">
        {data?.map((data: ClassType) => (
          <ClassItem data={data} editable={editable} key={data?.id} />
        ))}
      </div>
    </div>
  );
}
