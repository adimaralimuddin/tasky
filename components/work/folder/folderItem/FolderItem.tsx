import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import useFolderGetter from "../../../../features/app/folders/useFolderGetter";
// import useFolderSetter from "../../../../features/app/folders/useFolderSetter";
import { FolderType } from "../../../../features/folder/folderTypes";
import Icon from "../../../elements/Icon";
import FolderItemContent from "./FolderItemContent";

type props = {
  data: FolderType;
  classId: string | any;
};

export default function FolderItem({ data, classId }: props) {
  const { id, name } = data;
  const { isFolderSelected } = useFolderGetter();
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);

  const onFolderSelected = () => {
    setOpen((p) => !p);
  };

  return (
    <div
      className={
        "flex flex-col rounded-md relative justify-center    " +
        (selected && "bg-slate-100d ")
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        title={name}
        onClick={onFolderSelected}
        className={
          "flex items-center overflow-hidden hover:bg-slate-100 p-2 rounded-lg cursor-pointer text-slate-600 justify-between transition-[scale] active:scale-105 " +
          isFolderSelected(
            id,
            " bg-indigo-50 dark:bg-layer-100 dark:hover:bg-layer-sec ",
            " dark:hover:bg-layer-100 "
          )
        }
      >
        <Icon src="/icon/folder_icon.svg" className="mr-2" />
        <small className="flex-1 whitespace-nowrap text-phar dark:font-semibold">
          {name?.length > 20 ? name.substring(0, 20) + "..." : name}
        </small>
        <div className="dark:text-violet-400 ">
          {!open ? <FaAngleDown /> : <FaAngleUp />}
        </div>
      </div>
      <FolderItemContent
        id={id}
        classId={classId}
        data={data}
        open={open}
        setOpen={setOpen}
        setSelected={setSelected}
        hovered={hovered}
      />
    </div>
  );
}
