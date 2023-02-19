import React from "react";
import { CardTypes } from "../../../../features/card/CardType";
import useCards from "../../../../features/card/useCards";
import useWork from "../../../../features/work/useWork";
import Box from "../../../elements/Box";

type props = {
  field: string;
  topicId?: string;
  classId?: string;
};

export default function CategoryItem({ field, topicId, classId }: props) {
  const { category, isLoading } = useCards(topicId);
  const { setCategory } = useWork();
  const cards = category(field);

  if (isLoading) return <Loading />;

  return (
    <div
      onClick={() => setCategory(field)}
      className=" card min-h-[100px]  cursor-pointer ring_ hover:pop_ transition_ hover:shadow-lg "
    >
      <p className="text-indigo-400 dark:text-indigo-300">{field}</p>
      <div className="flex_ justify-between flex-wrap">
        <div className="flex_">
          <p className="text-xl font-bold">{cards?.length} </p>
          <p className="text-lg">items</p>
        </div>
        <LevelField cards={cards} filter="hard" />
        <LevelField cards={cards} filter="normal" />
      </div>
    </div>
  );
}

const LevelField = ({
  cards,
  filter = "easy",
}: {
  cards: CardTypes[];
  filter: "hard" | "normal" | "easy";
}) => (
  <div className="flex_">
    <p className="text-lg font-bold">
      {cards?.filter((c: any) => c?.level === filter)?.length}{" "}
    </p>
    <p className="text-">{filter}</p>
  </div>
);

function Loading() {
  return (
    <div className="min-h-[90px] animate-pulse flex-1 flex gap-2 flex-col items-centerd djustify-center p-3 rounded-xl ring-2 dark:ring-slate-500">
      <span className="dark:bg-slate-500 p-[6px] rounded-lg max-w-[60%]"></span>
      <span className="dark:bg-slate-600 p-1 rounded-lg"></span>
    </div>
  );
}
