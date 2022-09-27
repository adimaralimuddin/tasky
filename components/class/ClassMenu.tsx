import React, { useState } from "react";
import useClass from "../../features/class/useClass";
import { Pencil, Trash } from "../../lib/icons";
import Loader from "../elements/Loader";
import Option from "../elements/Option";
import Verifier from "../elements/Verifier";
import ClassRenamer from "./ClassRenamer";
import { ClassType } from "./classTypes";

export default function ClassMenu({ data }: { data: ClassType }) {
  const { deleteClass, classDeleter } = useClass(data?.id);
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

  const onDeleteHandler = () => {
    deleteClass(data?.id);
  };
  return (
    <div>
      <div
        title={data?.name}
        onMouseEnter={(_) => setHovered(true)}
        onMouseLeave={(_) => setHovered(false)}
        className="hover:bg-slate-100 dark:hover:bg-slate-600 cursor-pointer rounded-lg flex items-center justify-between text-cyan-600 dark:text-white ring-1d px-3"
      >
        <h2 className="whitespace-nowrap">
          {data?.name && data?.name?.length > 15
            ? data?.name?.substring(0, 15) + "..."
            : data?.name}
        </h2>
        {hovered && <Option options={options} left={true} />}
      </div>
      <ClassRenamer data={data} open={isRenameing} setOpen={setIsRenaming} />
      <Verifier
        message="are you sure to delete this class"
        open={isDeleting}
        setOpen={setIsDeleting}
        onOkay={onDeleteHandler}
      />
      <Loader message="deleting class ... " open={classDeleter?.isLoading} />
    </div>
  );
}
