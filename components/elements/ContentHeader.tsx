import React from "react";
import BtnBack from "./BtnBack";
import TopicTitle from "./TopicTitle";

export default function ContentHeader({
  Action = <BtnBack />,
  extraPath,
  removeMiddlePaths,
}: {
  Action?: React.ReactNode;
  extraPath?: string;
  removeMiddlePaths?: boolean;
}) {
  return (
    <div className="flex justify-between items-center flex-wrap-reverse ">
      <TopicTitle extraPath={extraPath} removeMiddlePaths={removeMiddlePaths} />
      {Action}
    </div>
  );
}
