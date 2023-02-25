import React from "react";
import { ContentType } from "../../features/app/appSlice";
import useContentSetter from "../../features/app/contents/useContentSetter";
import { LeftArrow } from "../../lib/icons";

type propTypes = {
  category?: string;
  content?: ContentType;
  onClick?: Function;
};
export default function BtnBack({ content = "topic", onClick }: propTypes) {
  const setContent = useContentSetter().setContent;

  return (
    <button
      className="m-0 py-0 mx-5 px-1 pr-2  dark:text-slate-300 dark:hover:text-violet-300 ring-slate-200"
      onClick={(_) => {
        // setCategory(category);
        setContent(content);
        onClick?.();
      }}
    >
      <LeftArrow className="text-xl" />
      back
    </button>
  );
}
