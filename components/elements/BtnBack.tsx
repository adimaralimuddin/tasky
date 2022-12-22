import React from "react";
import useWork from "../../features/work/useWork";
import { LeftArrow } from "../../lib/icons";

type propTypes = {
  category?: string;
  content?: string;
  onClick?: Function;
};
export default function BtnBack({
  category = "all",
  content = "topic",
  onClick,
}: propTypes) {
  const { work, setContent, setCategory } = useWork();

  return (
    <button
      className="m-0 py-0 mx-5 px-2 hover:ring-1 ring-slate-200"
      onClick={(_) => {
        setCategory(category);
        setContent(content);
        onClick?.();
      }}
    >
      <LeftArrow className="text-xl" />
      back
    </button>
  );
}
