import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { CardTypes } from "../../../../features/card/CardType";
import useViewer from "../../../../features/viewer/useViewer";
import NoCards from "../../../elements/NoCards";
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
  cards: CardTypes[] | undefined;
  overflow?: boolean;
  hideCardAdder?: boolean;
  hideAction?: boolean;
  headers?: React.ReactNode;
};
export default function CardListWithQuery({
  cards: cards_ = [],
  overflow,
  hideCardAdder,
  hideAction,
  headers,
}: props) {
  const [cards, setCards] = useState(cards_);
  const viewer = useViewer();

  useEffect(() => {
    setCards(cards_);
  }, [cards_]);

  return (
    <div className="flex-1 mt-2 col_ gap-0  ">
      <div className="flex gap-2 items-end flex-wrap justify-between ">
        <CardQuery cards={cards_} setCards={setCards}>
          {!hideAction && <ActionButtons hideCardAdder={hideCardAdder} />}
          {headers ? headers : null}
        </CardQuery>
      </div>
      {!cards?.length ? (
        <NoCards />
      ) : (
        <div
          style={{
            overflowY: overflow ? "auto" : undefined,
            maxHeight: overflow ? "75vh" : undefined,
          }}
          className="pl-7 p-1"
        >
          {cards?.map((card: CardTypes, ind) => (
            <CardItem
              card={card}
              key={card?.id}
              index={true}
              listInd={ind}
              side={viewer.side}
            />
          ))}
        </div>
      )}
    </div>
  );
}
