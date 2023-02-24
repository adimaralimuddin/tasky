import React from "react";
import { CardTypes } from "../../../../features/card/CardType";
import useCards from "../../../../features/card/useCards";
import useTopicGetter from "../../../../features/topic/useTopicGetter";
import CardItem from "../CardItem";

function CardLists() {
  const topicId = useTopicGetter().getSelectedTopicId();
  const { data } = useCards(topicId);

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
