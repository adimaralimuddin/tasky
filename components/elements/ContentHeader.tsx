import React from "react";
import BtnBack from "./BtnBack";
import TopicTitle from "./TopicTitle";

export default function ContentHeader({ Action = BtnBack }) {
  return (
    <div className="flex justify-between items-center flex-wrap-reverse ">
      <TopicTitle css="p-2 px-3" />
      <Action />
    </div>
  );
}
