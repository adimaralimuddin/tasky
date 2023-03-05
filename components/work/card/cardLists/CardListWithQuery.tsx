import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { CardTypes } from "../../../../features/card/CardType";
import useViewer from "../../../../features/viewer/useViewer";
import NoCards from "../../../elements/NoCards";
import CardQueryView from "../../viewer/CardQueryView";
import CardItem from "../cardItem/CardItem";

const CardQuery = dynamic(() => import("../CardQuery"), {
  ssr: false,
  loading: () => <p>card query herer . . . .</p>,
});
const ActionButtons = dynamic(() => import("../../../elements/ActionButtons"), {
  ssr: false,
  loading: () => <p>action button . . . .</p>,
});

type props = {
  cards: CardTypes[];
};
export default function CardListWithQuery({ cards: cards_ }: props) {
  const [cards, setCards] = useState(cards_);
  const viewer = useViewer();

  useEffect(() => {
    setCards(cards_);
  }, [cards_]);

  return (
    <div className="flex-1 mt-2 ">
      <div className="flex gap-2 items-end flex-wrap justify-between ">
        <CardQuery cards={cards_} setCards={setCards}>
          <ActionButtons />
        </CardQuery>
        {/* <div className="flex-1 flex_ justify-between">
          <CardQueryView /> */}
        {/* </div> */}
      </div>
      {!cards?.length ? (
        <NoCards />
      ) : (
        cards?.map((card: CardTypes) => (
          <CardItem
            card={card}
            key={card?.id}
            index={true}
            side={viewer.side}
          />
        ))
      )}
    </div>
  );
}
