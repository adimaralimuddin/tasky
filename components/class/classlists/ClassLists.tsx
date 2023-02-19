import React from "react";
import ClassItem from "../ClassItem";
import { ClassType } from "../classTypes";

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
      <small className="text-sm px-3">{title}</small>
      <div className="flex flex-wrap gap-3 py-2">
        {data?.map((data: ClassType) => (
          <ClassItem data={data} editable={editable} key={data?.id} />
        ))}
      </div>
    </div>
  );
}
