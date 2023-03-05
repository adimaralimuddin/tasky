import React, { useEffect, useState } from "react";
import { CardTypes } from "../../../features/card/CardType";
import Modal from "../../elements/Modal";
import CardItem from "../../work/card/cardItem/CardItem";
import CardQuery from "../../work/card/CardQuery";

interface Props {
  setOpen: any;
  open: boolean;
  selected: { text: string; value: number };
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
    <Modal open={open} setOpen={setOpen}>
      {(CloseIcon: any) => (
        <div className="  w-full max-h-[95vh] min-h-[95vh]   max-w-4xl card flex-col ">
          <CloseIcon />
          <header className=" col_ gap-2 px-d">
            <div className="flex_">
              <h2 className="text-sec font-semibold">{selected.text}</h2>
              <h3 className="text-value  font-semibold">{selected.value} %</h3>
            </div>
            <CardQuery cards={cards_} setCards={setCards} />
          </header>
          <div className="flex-1 overflow-y-auto overflow-x-hidden">
            {cards?.map((card: CardTypes) => (
              <CardItem card={card} key={card?.id} index={true} side={"both"} />
            ))}
          </div>
        </div>
      )}
    </Modal>
  );
}

const noCardsview = (
  <h1 className="text-slate-500 m-2 text-center min-h-[130px] rounded-xl bg-slate-100 ring-1 flex items-center justify-center ring-slate-200  ">
    No Cards
  </h1>
);
