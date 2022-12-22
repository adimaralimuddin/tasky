import React, { useEffect, useState } from "react";
import { CardTypes } from "../../../features/card/CardType";
import ActionButtons from "../../elements/ActionButtons";
import CardItem from "./CardItem";
import CardQuery from "./CardQuery";

type props = {
  classId: string;
  cards: CardTypes[];
};
export default function CardList({ classId, cards: cards_ }: props) {
  const [cards, setCards] = useState(cards_);

  useEffect(() => {
    setCards(cards_);
  }, [cards_]);

  return (
    <div className="flex-1 px-3">
      <div className="flex gap-2 items-end ring-slate-200 dark:bg-slate-700 my-2d p-2 rounded-lg bg-white mx-1 flex-wrap">
        <CardQuery classId={classId} cards={cards_} setCards={setCards} />
        <ActionButtons />
      </div>
      <div className="px-3 flex-1">
        {cards?.map((card: CardTypes) => (
          <CardItem card={card} key={card?.id} index={true} />
        ))}
      </div>
    </div>
  );
}
