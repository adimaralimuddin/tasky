import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import useContentSetter from "../../features/app/contents/useContentSetter";
import useClassGetter from "../../features/class/useClassGetter";
import useTopicGetter from "../../features/topic/useTopicGetter";
import { Plus } from "../../lib/icons";

export default function BtnCardAdder() {
  const { setContent } = useContentSetter();
  const topic = useTopicGetter().getSelectedTopic();
  const { user } = useUser();
  const class_ = useClassGetter().getClass();

  const onClickHandler = () => {
    setContent("cardadder");
  };

  if (user?.sub && topic?.userId !== user?.sub && !class_?.sample) {
    return null;
  }

  if (!user?.sub && !class_?.sample) {
    return null;
  }

  return (
    <button onClick={onClickHandler} className="text-value font-bold">
      <Plus />
      Add Card
    </button>
  );
}
