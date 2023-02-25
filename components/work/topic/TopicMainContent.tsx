import React from "react";
import useCategorySelecter from "../../../features/app/category/useCategorySelecter";
import useContentSetter from "../../../features/app/contents/useContentSetter";
import useCards from "../../../features/card/useCards";
import useTopicGetter from "../../../features/topic/useTopicGetter";
import BtnCardAdder from "../../elements/BtnCardAdder";
import BtnPrime from "../../elements/BtnPrime";
import BtnSec from "../../elements/BtnSec";
import ContentHeader from "../../elements/ContentHeader";
import CategoryItem from "./category/CategoryItem";

export default function TopicMainContent() {
  const { setContent } = useContentSetter();
  const { selectCategory } = useCategorySelecter();
  const topicId = useTopicGetter().getSelectedTopicId();
  const { data: cards } = useCards(topicId);

  const onSelectCategory = (field: "all" | "new" | "passed" | "left") => {
    selectCategory(field);
  };

  return (
    <div className="flex-1 flex flex-col container_ py-2 ">
      <ContentHeader Action={<BtnCardAdder />} />
      <div className="ring-1d flex-1 flex flex-col justify-center bg-green-400d  ">
        <main className="grid grid-cols-1 px-6 gap-5 flex-wrap  items-center justify-evenly md:grid-cols-2 ">
          <CategoryItem
            serverCards={cards}
            topicId={topicId}
            onSelect={onSelectCategory}
            field="all"
          />
          <CategoryItem
            serverCards={cards}
            topicId={topicId}
            onSelect={onSelectCategory}
            field="new"
          />
          <CategoryItem
            serverCards={cards}
            topicId={topicId}
            onSelect={onSelectCategory}
            field="passed"
          />
          <CategoryItem
            serverCards={cards}
            topicId={topicId}
            onSelect={onSelectCategory}
            field="left"
          />
        </main>
        <div className="py-5 flex items-center justify-center ">
          <BtnPrime onClick={() => setContent("play")}>play</BtnPrime>
          <BtnSec onClick={() => setContent("quiz")}>quiz</BtnSec>
        </div>
      </div>
    </div>
  );
}
