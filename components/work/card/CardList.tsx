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
    <div>
      <div className="flex gap-2 items-end ring-1 ring-slate-200 dark:bg-slate-700 my-2 p-2 rounded-lg bg-white mx-1 flex-wrap">
        <CardQuery classId={classId} cards={cards_} setCards={setCards} />
        <ActionButtons />
      </div>
      <div>
        {cards?.map((card: CardTypes) => (
          <CardItem card={card} key={card?.id} index={true} />
        ))}
      </div>
    </div>
  );
}
