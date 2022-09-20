import React from "react";
import useCards from "../../features/card/useCards";
import useWork from "../../features/work/useWork";

export default function TopicTitle({ css }: any) {
  const {
    work: { selectedCategory, selectedTopic },
  } = useWork();
  const { category } = useCards(selectedTopic?.id);
  const cards = category(selectedCategory);
  return (
    <div
      className={
        "flex-1 flex items-center gap-x-2 px-[4%] whitespace-nowrapd flex-wrap py-3  " +
        css
      }
    >
      <h3 className="text-cyan-600 text-xl  ">{selectedTopic?.name}</h3>
      <p className="text-slate-400">/</p>
      <p className="text-slate-500">{selectedCategory}</p>
      <p className="text-slate-400">/</p>
      <p className="text-cyan-500">
        {cards?.length} card{cards?.length > 1 && "s"}
      </p>
    </div>
  );
}
