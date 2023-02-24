import React from "react";
import BtnBack from "./BtnBack";
import TopicTitle from "./TopicTitle";

export default function ContentHeader({
  Action = <BtnBack />,
}: {
  Action?: React.ReactElement;
}) {
  return (
    <div className="flex justify-between items-center flex-wrap-reverse  px-6 ">
      <TopicTitle css="" />
      {Action}
    </div>
  );
}
