import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { TopicType } from "../../../../features/topic/topicType";
import useWork from "../../../../features/work/useWork";
import { Pencil, Plus, Trash } from "../../../../lib/icons";
import { DEF_USER } from "../../../../lib/public";
import Option from "../../../elements/Option";

type Props = {
  data: TopicType;
  setSideBar: any;
  hovered: boolean;
  setRenaming: any;
  setIsDeleting: any;
};
export default function TopicOptions({
  data,
  setSideBar,
  hovered,
  setRenaming,
  setIsDeleting,
}: Props) {
  const { user } = useUser();

  const { setContent } = useWork();

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

  return <div>{hovered && <Option options={options()} />}</div>;
}
