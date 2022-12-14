import React, { useState, useEffect } from "react";
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
import Loader from "../../elements/Loader";
import { FolderType } from "./folderTypes";
import { useUser } from "@auth0/nextjs-auth0";
import { DEF_USER } from "../../../lib/public";

type props = {
  data: FolderType;
  classId: string | any;
  setSideBar: any;
};

export default function FolderItem({ data, classId, setSideBar }: props) {
  const { user } = useUser();
  const { id, name, userId } = data;
  const { topics } = useTopics(id);
  const { deleteFolder, folderDeleter } = useFolderMutation(classId);
  const { setOpenTopicAdder, setSelectedFolder } = useWork();

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const options = () => {
    let ret = [
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
    let notUserOptions = [{ text: "you're not allowed" }];
    if (user?.sub) {
      return user?.sub == userId ? ret : notUserOptions;
    } else {
      return userId !== DEF_USER ? notUserOptions : ret;
    }
  };

  const ondeleteHandler = () => {
    if (data?.sample) {
      return alert(
        "sample folder will not be deleted. you can always create, edit and delete your own folder."
      );
    }
    deleteFolder(user?.sub || DEF_USER, id);
  };

  return (
    <div
      className={"flex flex-col rounded-md   " + (selected && "bg-slate-100d ")}
      onMouseEnter={(_) => setHovered(true)}
      onMouseLeave={(_) => setHovered(false)}
    >
      <div
        title={name}
        onClick={(_) => setOpen((p) => !p)}
        className="flex items-center hover:bg-slate-100 dark:hover:bg-slate-600 p-1 px-1 rounded-lg cursor-pointer text-slate-600 justify-between text-orange-600d"
      >
        <FolderIcon className="text-2xl mr-2" />
        <small className="flex-1 whitespace-nowrap">
          {name?.length > 20 ? name.substring(0, 20) + "..." : name}
        </small>
        {!open ? <DownIcon /> : <UpIcon />}
        {hovered && <Option options={options()} />}
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
        data={data}
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
      <Loader message="deleting folder ..." open={folderDeleter.isLoading} />
    </div>
  );
}
