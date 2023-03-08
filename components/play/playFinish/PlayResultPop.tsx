import React, { useEffect, useState } from "react";
import { LevelType } from "../../../features/app/appSlice";
import { CardTypes } from "../../../features/card/CardType";
import Modal from "../../elements/Modal";
import CardItem from "../../work/card/cardItem/CardItem";
import CardQuery from "../../work/card/CardQuery";

interface Props {
  setOpen: any;
  open: boolean;
  selected: { text: string; level: LevelType; value: number };
  cards: CardTypes[];
}
export default function PlayResultPop({
  setOpen,
  open,
  selected,
  cards: cards_,
}: Props) {
  const [cards, setCards] = useState(cards_);

  useEffect(() => {
    setCards(cards_);
  }, [cards_]);

  return (
    <Modal
      className="max-w-5xl h-full  max-h-[90vh] "
      open={open}
      setOpen={setOpen}
    >
      {() => (
        <div className="flex-1  w-full card col_ gap-0 p-0 ">
          <header className=" col_ gap-2">
            <div className="flex_">
              <h2 className="text-sec font-semibold">{selected.text}</h2>
              <h3 className="text-value  font-semibold">{selected.value} %</h3>
            </div>
            <CardQuery cards={cards_} setCards={setCards} />
          </header>
          <div className="flex-1 overflow-y-auto overflow-x-hidden max-h-[65vh] p-2 pl-4 ">
            {cards?.map((card: CardTypes) => (
              <CardItem card={card} key={card?.id} index={true} side={"both"} />
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}
