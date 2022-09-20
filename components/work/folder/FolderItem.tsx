import React, { useState } from "react";
import { TopicType } from "../../../features/topic/topicType";
import useTopics from "../../../features/topic/useTopics";
import useWork from "../../../features/work/useWork";
import TopicItem from "../topic/TopicItem";
import Option from "../../elements/Option";
import {
  DownIcon,
  FolderIcon,
  Pencil,
  PlusBig,
  Trash,
  UpIcon,
} from "../../../lib/icons";
import useFolderMutation from "../../../features/folder/useFolderMutation";
import FolderRenamer from "./FolderRenamer";
import Verifier from "../../elements/Verifier";

type props = {
  data: {
    id: string;
    name: string;
  };
  classId: string | any;
  setSideBar: any;
};

export default function FolderItem({
  data: { id, name },
  classId,
  setSideBar,
}: props) {
  const { topics } = useTopics(id);
  const { deleteFolder } = useFolderMutation(classId);
  const { setOpenTopicAdder, setSelectedFolder } = useWork();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const options = [
    {
      icon: <PlusBig />,
      text: "topic",
      action: () => {
        setOpenTopicAdder(true);
        setSelectedFolder(id);
        setOpen(true);
      },
    },
    { icon: <Pencil />, text: "rename", action: () => setRenaming(true) },
    { icon: <Trash />, text: "delete", action: () => setIsDeleting(true) },
  ];
  const topOptions = [
    { icon: "", text: "+ topic" },
    { icon: "", text: "+ folder" },
  ];

  const ondeleteHandler = () => deleteFolder(id);

  return (
    <div
      className={"flex flex-col rounded-md   " + (selected && "bg-slate-100d ")}
      onMouseEnter={(_) => setHovered(true)}
      onMouseLeave={(_) => setHovered(false)}
    >
      <div
        title={name}
        onClick={(_) => setOpen((p) => !p)}
        className="flex items-center hover:bg-slate-100 p-1 px-1 rounded-lg cursor-pointer text-slate-600 justify-between text-orange-600d"
      >
        <FolderIcon className="text-2xl mr-2" />
        <small className="flex-1 whitespace-nowrap">
          {name?.length > 20 ? name.substring(0, 20) + "..." : name}
        </small>
        {!open ? <DownIcon /> : <UpIcon />}
        {hovered && <Option options={options} />}
      </div>
      {open && (
        <div className="ml-3 border-l-2 px-2">
          {topics?.data?.map((topic: TopicType) => (
            <TopicItem
              data={topic}
              key={topic.id}
              selectFolder={setSelected}
              setSideBar={setSideBar}
            />
          ))}
        </div>
      )}
      <FolderRenamer
        data={{ id, name }}
        renaming={renaming}
        setOpen={setRenaming}
        classId={classId}
      />
      <Verifier
        message="are you sure to delete this folder"
        open={isDeleting}
        setOpen={setIsDeleting}
        onOkay={ondeleteHandler}
      />
    </div>
  );
}
