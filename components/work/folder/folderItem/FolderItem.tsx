import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
// import { HiOutlineFolder } from "react-icons/hi";
import { FolderType } from "../../../../features/folder/folderTypes";
// import useFolder from "../../../../features/folder/useFolder";
import FolderItemContent from "./FolderItemContent";

type props = {
  data: FolderType;
  classId: string | any;
};

export default function FolderItem({ data, classId }: props) {
  const { id, name } = data;

  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className={
        "flex flex-col rounded-md relative   " + (selected && "bg-slate-100d ")
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        title={name}
        onClick={() => setOpen((p) => !p)}
        className="flex items-center overflow-hidden hover:bg-slate-100 dark:hover:bg-slate-600 p-1 px-2 rounded-lg cursor-pointer text-slate-600 justify-between "
      >
        {/* <HiOutlineFolder className="text-2xl mr-2" /> */}
        <small className="flex-1 whitespace-nowrap">
          {name?.length > 20 ? name.substring(0, 20) + "..." : name}
        </small>
        <div className="dark:text-violet-400 ">
          {!open ? <FaAngleDown /> : <FaAngleUp />}
        </div>
      </div>
      <FolderItemContent
        data={data}
        classId={classId}
        hovered={hovered}
        setOpen={setOpen}
        id={id}
        open={open}
        setSelected={setSelected}
      />
    </div>
  );
}
