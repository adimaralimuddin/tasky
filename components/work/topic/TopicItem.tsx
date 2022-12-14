import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { TopicType } from "../../../features/topic/topicType";
import useTopic from "../../../features/topic/useTopic";
import useWork from "../../../features/work/useWork";
import { Pencil, Plus, TopicIcon, Trash } from "../../../lib/icons";
import { DEF_USER } from "../../../lib/public";
import Loader from "../../elements/Loader";
import Option from "../../elements/Option";
import Verifier from "../../elements/Verifier";
import TopicRenamer from "./TopicRenamer";

type props = {
  data: TopicType;
  key?: any;
  selectFolder: any;
  setSideBar: any;
};

export default function TopicItem({ data, selectFolder, setSideBar }: props) {
  const [hovered, setHovered] = useState(false);
  const [renaming, setRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const { user } = useUser();
  const { setTopic, work, setContent } = useWork();
  const { deleteTopic, topicDeleter } = useTopic(data?.folderId);

  const isSelected = (a: any = true, b: any = false) =>
    work?.selectedTopic?.id === data.id ? a : b;

  const onDeleteHandler = () => {
    if (data?.sample) {
      return alert(
        "sample topic will not be deleted. you can always create, edit and delete your own topic"
      );
    }
    deleteTopic({ userId: user?.sub || DEF_USER, topicId: data?.id });
  };

  const options = () => {
    const ret = [
      {
        icon: <Plus />,
        text: "card",
        action: () => {
          setContent("cardadder");
          setSideBar();
        },
      },
      {
        icon: <Pencil />,
        text: "rename",
        action: () => setRenaming(true),
      },
      {
        icon: <Trash />,
        text: "delete",
        action: () => setIsDeleting(true),
      },
    ];
    let notUserOptions = [{ text: "you're not allowed" }];
    if (user?.sub) {
      return user?.sub == data?.userId ? ret : notUserOptions;
    } else {
      return data?.userId !== DEF_USER ? notUserOptions : ret;
    }
  };

  return (
    <div className="flex flex-col">
      <div
        onMouseEnter={(_) => setHovered(true)}
        onMouseLeave={(_) => setHovered(false)}
        onClick={() => {
          setTopic(data);
          selectFolder(true);
        }}
        className={
          "cursor-pointer flex items-center hover:bg-slate-100 dark:hover:bg-slate-600 px-2 p-[2px] rounded-lg text-slate-700 justify-between min-h-[20px]d ring-1d " +
          isSelected(" bg-slate-100 dark:bg-slate-600")
        }
      >
        <TopicIcon className="mr-1 text-violet-500" />
        <small className="flex-1 py-1 whitespace-nowrap">
          {data?.name?.length > 20
            ? data?.name?.substring(0, 20) + "..."
            : data?.name}
        </small>
        {hovered && <Option options={options()} />}
      </div>
      <TopicRenamer data={data} open={renaming} setOpen={setRenaming} />
      <Verifier
        message="are you sure to delete this topic"
        open={isDeleting}
        setOpen={setIsDeleting}
        onOkay={onDeleteHandler}
      />
      <Loader message="deleting topic ... " open={topicDeleter?.isLoading} />
    </div>
  );
}
