import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { FolderType } from "../../../../features/folder/folderTypes";
import useWork from "../../../../features/work/useWork";
import { Pencil, PlusBig, Trash } from "../../../../lib/icons";
import { DEF_USER } from "../../../../lib/public";
import Option from "../../../elements/Option";

interface Props {
  data: FolderType;
  setOpen: any;
  setRenaming: any;
  setIsDeleting: any;
  hovered: boolean;
}
export default function FolderOptions({
  data,
  setOpen,
  setRenaming,
  setIsDeleting,
  hovered,
}: Props) {
  const { user } = useUser();
  const { id, name, userId } = data;

  const { setOpenTopicAdder, setSelectedFolder } = useWork();

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
  return <div>{hovered && <Option options={options()} />}</div>;
}
