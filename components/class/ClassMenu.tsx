import React, { useState } from "react";
import { ClassType } from "../../features/class/classTypes";
import { Pencil, Trash } from "../../lib/icons";
import Option from "../elements/Option";
import ClassDeleter from "./classEditor/ClassDeleter";
import ClassRenamer from "./classEditor/ClassRenamer";

export default function ClassMenu({ data }: { data: ClassType }) {
  const [isRenameing, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hovered, setHovered] = useState(false);
  const options = [
    {
      text: "Rename Class",
      icon: <Pencil />,
      action: () => setIsRenaming(true),
    },
    {
      text: "Delete Class",
      icon: <Trash />,
      action: () => setIsDeleting(true),
    },
  ];

  return (
    <div>
      <div
        title={data?.name}
        onMouseEnter={(_) => setHovered(true)}
        onMouseLeave={(_) => setHovered(false)}
        className="hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer rounded-lg flex items-center justify-between text-cyan-600 dark:text-white ring-1d px-3"
      >
        <h3 className="whitespace-nowrap">
          {data?.name && data?.name?.length > 25
            ? data?.name?.substring(0, 15) + "..."
            : data?.name}
        </h3>
        {hovered && <Option options={options} left={true} />}
      </div>
      <ClassRenamer data={data} open={isRenameing} setOpen={setIsRenaming} />
      <ClassDeleter
        data={data}
        editable={true}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        setIsEditing={() => {}}
      />
    </div>
  );
}
