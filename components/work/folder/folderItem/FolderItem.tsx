// import dynamic from "next/dynamic";
import dynamic from "next/dynamic";
import React, { useState } from "react";
// import { HiOutlineFolder } from "react-icons/hi";
import { FolderType } from "../../../../features/folder/folderTypes";
import TextLoader from "../../../elements/TextLoader";
import FolderItemContent from "./FolderItemContent";
// import FolderItemActions from "./FolderItemContent";
// import { TopicType } from "../../../../features/topic/topicType";
// import useTopics from "../../../../features/topic/useTopics";
// import { DownIcon, UpIcon } from "../../../../lib/icons";

// const FolderItemContent = dynamic(() => import("./FolderItemContent"), {
//   ssr: false,
//   loading: () => (
//     <div>
//       content..
//       {/* <TextLoader /> */}
//       {/* <TextLoader /> */}
//       {/* <TextLoader /> */}
//     </div>
//   ),
// });

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
        "flex flex-col rounded-md relative  " + (selected && "bg-slate-100d ")
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        title={name}
        onClick={() => setOpen((p) => !p)}
        className="flex items-center hover:bg-slate-100 dark:hover:bg-slate-600 p-1 px-1 rounded-lg cursor-pointer text-slate-600 justify-between text-orange-600d"
      >
        {/* <HiOutlineFolder className="text-2xl mr-2" /> */}
        <small className="flex-1 whitespace-nowrap">
          {name?.length > 20 ? name.substring(0, 20) + "..." : name}
        </small>
        {!open ? ">" : "<"}
        {/* {!open ? <DownIcon /> : <UpIcon />} */}
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
