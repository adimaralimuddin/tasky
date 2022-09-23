import React from "react";
import useWork from "../../../features/work/useWork";
import Box from "../../elements/Box";
import BtnCardAdder from "../../elements/BtnCardAdder";
import BtnPrime from "../../elements/BtnPrime";
import BtnSec from "../../elements/BtnSec";
import ContentHeader from "../../elements/ContentHeader";
import CategoryItem from "./category/CategoryItem";

export default function TopicMainContent({ classId }: any) {
  const { work, setContent } = useWork();
  const { selectedTopic: topic } = work;

  return (
    <Box css="flex-1 flex flex-col p-0">
      <ContentHeader Action={BtnCardAdder} />
      <div className="ring-1d flex-1 flex flex-col items-center justify-center ">
        <main className="flex flex-wrap  items-center justify-center ">
          <CategoryItem field="all" topicId={topic?.id} classId={classId} />
          <CategoryItem field="new" topicId={topic?.id} classId={classId} />
          <CategoryItem field="passed" topicId={topic?.id} classId={classId} />
          <CategoryItem field="left" topicId={topic?.id} classId={classId} />
        </main>
        <div className="py-5 flex items-center">
          <BtnPrime onClick={() => setContent("play")}>play</BtnPrime>
          <BtnSec onClick={() => setContent("quiz")}>quiz</BtnSec>
        </div>
      </div>
    </Box>
  );
}
