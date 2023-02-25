import React from "react";
import { CardTypes } from "../../../../features/card/CardType";
import useCards from "../../../../features/card/useCards";

type props = {
  field: "all" | "new" | "passed" | "left";
  topicId?: string;
  classId?: string;
  onSelect: any;
  serverCards: CardTypes[] | undefined;
};

export default function CategoryItem({
  field,
  onSelect,
  topicId,
  serverCards,
  classId,
}: props) {
  const { categorizeCards, isLoading } = useCards(topicId);
  const cards = categorizeCards(field, serverCards);

  return (
    <div
      onClick={() => onSelect(field)}
      className=" card min-h-[100px]  cursor-pointer ring_ hover:pop_ transition_ hover:shadow-lg dark:ring-2 dark:hover:ring-indigo-300"
    >
      <p className="text-indigo-400 dark:text-indigo-300">{field}</p>
      <div className="flex_ justify-between flex-wrap ">
        <div className="flex_ ">
          <p className="text-xl font-bold ">{cards?.length} </p>
          <p className="text-lg ">items</p>
        </div>
        <LevelField cards={cards} filter="hard" />
        <LevelField cards={cards} filter="normal" />
      </div>
    </div>
    // </Link>
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
    <p className="text-lg font-bold ">
      {cards?.filter((c: any) => c?.level === filter)?.length}{" "}
    </p>
    <p className=" ">{filter}</p>
  </div>
);

// function Loading() {
//   return (
//     <div className="min-h-[90px] animate-pulse flex-1 flex gap-2 flex-col items-centerd djustify-center p-3 rounded-xl ring-2 dark:ring-slate-500">
//       <span className="dark:bg-slate-500 p-[6px] rounded-lg max-w-[60%]"></span>
//       <span className="dark:bg-slate-600 p-1 rounded-lg"></span>
//     </div>
//   );
// }
