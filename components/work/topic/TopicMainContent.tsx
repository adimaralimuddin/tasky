import React from "react";
import useWork from "../../../features/work/useWork";
import BtnCardAdder from "../../elements/BtnCardAdder";
import BtnPrime from "../../elements/BtnPrime";
import BtnSec from "../../elements/BtnSec";
import ContentHeader from "../../elements/ContentHeader";
import CategoryItem from "./category/CategoryItem";

export default function TopicMainContent({ classId }: any) {
  const { work, setContent } = useWork();
  const { selectedTopic: topic } = work;

  return (
    <div className="flex-1 flex flex-col container_">
      <ContentHeader Action={BtnCardAdder} />
      <div className="ring-1d flex-1 flex flex-col items-centerd justify-center ">
        <main className="grid grid-cols-2 px-6 gap-5 flex-wrap  items-center justify-evenly ">
          <CategoryItem field="all" topicId={topic?.id} classId={classId} />
          <CategoryItem field="new" topicId={topic?.id} classId={classId} />
          <CategoryItem field="passed" topicId={topic?.id} classId={classId} />
          <CategoryItem field="left" topicId={topic?.id} classId={classId} />
        </main>
        <div className="py-5 flex items-center justify-center ">
          <BtnPrime onClick={() => setContent("play")}>play</BtnPrime>
          <BtnSec onClick={() => setContent("quiz")}>quiz</BtnSec>
        </div>
      </div>
    </div>
  );
}

function Loading() {
  return <div>loading ...</div>;
}
