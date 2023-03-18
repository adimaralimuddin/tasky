import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { useDispatch } from "react-redux";
import { toAddTopic } from "../../../../features/app/appSlice";
import useClassGetter from "../../../../features/class/useClassGetter";
import { FolderType } from "../../../../features/folder/folderTypes";
import { Pencil, PlusBig, Trash } from "../../../../lib/icons";
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
  const { class_ } = useClassGetter();

  const { id, userId } = data;
  const patch = useDispatch();

  const options = () => {
    let ret = [
      {
        icon: <PlusBig />,
        text: "topic",
        action: () => {
          patch(toAddTopic(id));
          setOpen(true);
        },
      },
      { icon: <Pencil />, text: "rename", action: () => setRenaming(true) },
      { icon: <Trash />, text: "delete", action: () => setIsDeleting(true) },
    ];
    let notUserOptions = [{ text: "you're not allowed" }];
    if (user?.sub) {
      return user?.sub === userId || class_?.sample ? ret : notUserOptions;
    } else {
      return class_?.sample ? ret : notUserOptions;
    }
  };
  return <Option show={hovered} left={true} options={options()} />;
}
