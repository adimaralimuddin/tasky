import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import useContentSetter from "../../features/app/contents/useContentSetter";
import useTopicGetter from "../../features/topic/useTopicGetter";
import { Plus } from "../../lib/icons";
import { DEF_USER } from "../../lib/public";

export default function BtnCardAdder() {
  const { setContent } = useContentSetter();
  const topic = useTopicGetter().getSelectedTopic();
  const { user } = useUser();

  const onClickHandler = () => {
    setContent("cardadder");
  };

  if (user?.sub) {
    if (topic?.userId !== user?.sub) {
      return <></>;
    }
  } else {
    if (topic?.userId !== DEF_USER) {
      return <></>;
    }
  }

  return (
    <button onClick={onClickHandler} className="text-value font-bold">
      <Plus />
      Add Card
    </button>
  );
}
