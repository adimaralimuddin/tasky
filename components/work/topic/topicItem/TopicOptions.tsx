import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import useContentSetter from "../../../../features/app/contents/useContentSetter";
import { TopicType } from "../../../../features/topic/topicType";
import { Pencil, Plus, Trash } from "../../../../lib/icons";
import { DEF_USER } from "../../../../lib/public";
import Option from "../../../elements/Option";

type Props = {
  data: TopicType;
  hovered: boolean;
  setRenaming: any;
  setIsDeleting: any;
};
export default function TopicOptions({
  data,
  hovered,
  setRenaming,
  setIsDeleting,
}: Props) {
  const { user } = useUser();
  const { setContent } = useContentSetter();

  const options = () => {
    const ret = [
      {
        icon: <Plus />,
        text: "card",
        action: () => setContent("cardadder"),
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

  return <div>{hovered && <Option left={true} options={options()} />}</div>;
}
