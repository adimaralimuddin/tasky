import React from "react";
import useCategoryGetter from "../../features/app/category/useCategoryGetter";
import useCards from "../../features/card/useCards";
import useTopicGetter from "../../features/topic/useTopicGetter";

export default function TopicTitle({
  css,
  extraPath,
  removeMiddlePaths,
}: {
  css?: string;
  extraPath?: string;
  removeMiddlePaths?: boolean;
}) {
  const { getSelectedTopic } = useTopicGetter();
  const { getSelectedCategory } = useCategoryGetter();

  const topic = getSelectedTopic();
  const selectedCategory = getSelectedCategory();

  const { categorizeCards } = useCards(topic?.id);
  const cards = categorizeCards(selectedCategory);

  return (
    <div
      className={
        "flex-1 min-w-[100px] flex items-center gap-x-2 whitespace-nowrap overflow-x-hidden flex-wrap   " +
        css
      }
    >
      <p className="text-accent font-semibold ">{topic?.name}</p>
      {!removeMiddlePaths && (
        <div className="flex_ gap-1">
          <p className="text-slate-400">/</p>
          <p className="text-slate-500d text-phar">{selectedCategory}</p>
          <p className="text-slate-400">/</p>
          <p className="text-cyan-500">
            {cards?.length} card{cards?.length > 1 && "s"}
          </p>
        </div>
      )}
      <p className="text-phar">
        {extraPath && typeof extraPath === "string" ? `/ ${extraPath}` : null}
      </p>
    </div>
  );
}
