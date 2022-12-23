import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import useWork from "../../features/work/useWork";
import { Plus } from "../../lib/icons";
import { DEF_USER } from "../../lib/public";

export default function BtnCardAdder() {
  const { setContent, work } = useWork();
  const { selectedTopic: topic } = work;
  const { user } = useUser();

  const onClickHandler = () => {
    setContent("cardadder");
  };

  if (user?.sub) {
    if (topic?.userId !== user?.sub) {
      return "";
    }
  } else {
    if (topic?.userId !== DEF_USER) {
      return "";
    }
  }

  return (
    <p
      onClick={onClickHandler}
      className="flex items-center gap-1 px-3 mx-3 rounded-full ring-1 ring-slate-300 cursor-pointer hover:shadow-md text-purple-500 dark:text-violet-300 dark:ring-violet-300 text-slate-500d"
    >
      <Plus />
      Card
    </p>
  );
}
