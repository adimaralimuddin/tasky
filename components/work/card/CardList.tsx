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
    <div className="flex-1 mt-2">
      <div className="flex gap-2 items-end flex-wrap ">
        <CardQuery classId={classId} cards={cards_} setCards={setCards} />
        <ActionButtons />
      </div>
      {cards?.map((card: CardTypes) => (
        <CardItem card={card} key={card?.id} index={true} />
      ))}
    </div>
  );
}
