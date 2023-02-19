import { useRouter } from "next/router";
import React from "react";
import useCards from "../../features/card/useCards";

export default function TopicTitle({ css }: any) {
  const { query } = useRouter();
  const name = query?.topicName;
  const id = String(query?.topicId);
  const selectedCategory = String(query?.category);

  const { category } = useCards(id);
  const cards = category(selectedCategory);

  return (
    <div
      className={
        "flex-1 flex items-center gap-x-2 flex-wrap py-2 text-sm " + css
      }
    >
      <p className="text-cyan-600   ">{name}</p>
      <p className="text-slate-400">/</p>
      <p className="text-slate-500">{selectedCategory}</p>
      <p className="text-slate-400">/</p>
      <p className="text-cyan-500">
        {cards?.length} card{cards?.length > 1 && "s"}
      </p>
    </div>
  );
}
