import React from "react";
import useCategoryGetter from "../../features/app/category/useCategoryGetter";
import useCards from "../../features/card/useCards";
import useTopicGetter from "../../features/topic/useTopicGetter";

export default function TopicTitle({ css }: any) {
  const { getSelectedTopic } = useTopicGetter();
  const { getSelectedCategory } = useCategoryGetter();

  const topic = getSelectedTopic();
  const selectedCategory = getSelectedCategory();

  const { categorizeCards } = useCards(topic?.id);
  const cards = categorizeCards(selectedCategory);

  return (
    <div
      className={
        "flex-1 flex items-center gap-x-2 flex-wrap py-2 text-sm  " + css
      }
    >
      <p className="text-cyan-600   ">{topic?.name}</p>
      <p className="text-slate-400">/</p>
      <p className="text-slate-500">{selectedCategory}</p>
      <p className="text-slate-400">/</p>
      <p className="text-cyan-500">
        {cards?.length} card{cards?.length > 1 && "s"}
      </p>
    </div>
  );
}
