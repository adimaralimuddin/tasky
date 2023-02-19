import React from "react";
import { CardTypes } from "../../../../features/card/CardType";
import useCards from "../../../../features/card/useCards";
import _useWorkRoutes from "../../../../lib/_routes/_useWorkRoutes";
import CardItem from "../CardItem";

function CardLists() {
  const { topic } = _useWorkRoutes();
  const { data } = useCards(topic?.id);

  return (
    <div className="p-2">
      {data
        ?.map((c: CardTypes, ind: number) => ({ ...c, ind }))
        ?.sort((a: any, b: any) => b?.ind - a?.ind)
        ?.map((card: CardTypes, ind: number) => (
          <CardItem card={card} key={card?.id + ind} index={true} />
        ))}
    </div>
  );
}

export default CardLists;
