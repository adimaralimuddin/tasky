import React from "react";
import { CategoryType } from "../../../../features/app/appSlice";
import useCategorySelecter from "../../../../features/app/category/useCategorySelecter";
import { CardTypes } from "../../../../features/card/CardType";
import useCards from "../../../../features/card/useCards";
import _usePercentage from "../../../../lib/utils/_usePercentage";
import PlayButton from "../../../play/PlayButton";
import QuizButton from "../../../quiz/QuizButton";

type props = {
  category: CategoryType;
  text?: "completed" | "remaining";
  topicId?: string;
  classId?: string;
  // onSelect: any;
  // serverCards: CardTypes[] | undefined;
};

export default function CategoryItem({
  category,
  topicId,
  // serverCards,
  text,
}: props) {
  const { categorizeCards, data: allCards } = useCards(topicId);
  const { selectCategory } = useCategorySelecter();
  const cards = categorizeCards(category, allCards);

  const onSelect = () => {
    selectCategory(category);
  };

  const color = (
    all_ = " bg-blue-50 dark:bg-blue-400 ",
    new_ = " bg-indigo-50 dark:bg-indigo-400 ",
    passed_ = " bg-green-50 dark:bg-green-400 ",
    left_ = " bg-red-50 dark:bg-pink-400"
  ) =>
    category === "new"
      ? new_
      : category === "passed"
      ? passed_
      : category === "left"
      ? left_
      : all_;

  return (
    <div
      onClick={onSelect}
      className="card-all col_ gap-0 animate-pop2 danimate-fadein flex-1 rounded-3xl py-4 shadow-md   px-[8%]  min-h-[100px]  cursor-pointer hover:pop_ transition_   relative overflow-hidden animation-pop2 "
    >
      <div
        className={
          "p-3 absolute w-full -top-12 -left-[25%] max-w-[250px] rounded-full aspect-square opacity-80 dark:opacity-5  " +
          color()
        }
      ></div>
      <header className="flex_ justify-between z-10 ">
        <h3 className="text-accent font-bold">{text || category}</h3>
        <p className="text-xld font-b ">
          <span>{cards?.length} </span>
          cards
        </p>
      </header>

      <div className="flex_ justify-between pt-2 z-10">
        <LevelField
          allCards={allCards}
          cards={cards}
          filter="easy"
          text="remembered"
        />
        <LevelField
          allCards={allCards}
          cards={cards}
          filter="hard"
          text="forgot"
        />
        <LevelField
          allCards={allCards}
          cards={cards}
          filter="normal"
          text="recall"
        />
      </div>
      <div className="flex  py-1 pt-3 justify-end gap-6 z-10">
        <PlayButton category={category} />
        <QuizButton category={category} />
      </div>
    </div>
    // </Link>
  );
}

const LevelField = ({
  cards,
  filter = "easy",
  text,
  allCards = [],
}: {
  cards: CardTypes[];
  allCards: CardTypes[] | undefined;
  filter: "hard" | "normal" | "easy";
  text: any;
}) => {
  const ownCards = cards?.filter((c: any) => c?.level === filter);
  return (
    <div className="flex flex-col items-start leading-tight">
      <h5 className="text-smd  font-semibold text-slate-500 text-sec pb-1">
        {text || filter}
      </h5>
      <h4 className="font-bold text-[#998BB0]d text-value">
        {_usePercentage(ownCards?.length, allCards?.length)} %
      </h4>
      <p className="text-sm font-normal text-slate-400 ">
        {ownCards?.length} cards
      </p>
    </div>
  );
};
