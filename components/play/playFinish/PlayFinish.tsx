import Image from "next/image";
import Script from "next/script";
import React, { useState } from "react";
import { CardTypes } from "../../../features/card/CardType";
import { LEVEL_EASY, LEVEL_HARD, LEVEL_NORMAL } from "../../../lib/public";
import Box from "../../elements/Box";
import BtnBack from "../../elements/BtnBack";
import BtnPrime from "../../elements/BtnPrime";
import Modal from "../../elements/Modal";
import Pie from "../../elements/Pie";
import TopicTitle from "../../elements/TopicTitle";
import CardItem from "../../work/card/cardItem/CardItem";
import CardListWithQuery from "../../work/card/cardLists/CardListWithQuery";
import PlayFinishResultItem from "./PlayFinishResultItem";
import PlayResultPop from "./PlayResultPop";

type props = {
  cards?: CardTypes[];
  finish: boolean;
  setFinish: any;
  playInd: number;
  setPlayInd: any;
};

export default function PlayFinish({
  setFinish,
  cards = [],
  setPlayInd,
}: props) {
  const [selected, setSelected] = useState<{ text: string; value: number }>({
    text: "",
    value: 0,
  });
  const [open, setOpen] = useState<boolean>(false);

  const filter = (filterType: string = "easy") =>
    cards?.filter((card) => card.level == filterType);

  const easyCards = filter("easy");
  const normalCards = filter("normal");
  const hardCards = filter("hard");

  const score = Math.floor(
    ((easyCards?.length + normalCards?.length / 2) / cards?.length) * 100
  );

  const scoreMessage = (
    good = "great job! you've got a good score!",
    average = "well done! you've scored average",
    bad = "to gain knowledge, you need to spend time."
  ) => (score > 70 ? good : score > 50 ? average : bad);

  const onRepeatHandler = () => {
    setPlayInd(0);
    setFinish(false);
  };

  const onItemSelect = (text: string, value: number) => {
    setOpen(true);
    setSelected({ text, value });
  };

  // console.log(`level `, filter(selected));

  return (
    <div className="flex-1 ">
      <div className="flex flex-col flex-1 ">
        <div className="flex_">
          <TopicTitle extraPath="play finish" />
          <BtnBack />
        </div>
        <div className="flex justify-between py-[3%] items-start max-w-3xl">
          <div>
            <h1 className="font-bold  text-3xl text-value ">Play Completed!</h1>
            <h2 className="font-bold text-accent">{scoreMessage()}</h2>
          </div>
          <button className="btn-prime" onClick={onRepeatHandler}>
            Replay
          </button>
        </div>
        <h3 className="text-accent font-semibold my-2">Result Stats</h3>
        <div className="">
          <div className="card gap-3 card-shadow max-w-3xl min-h-[160px] px-3 text-slate-500 flex-wrap">
            <div className=" min-w-[150px] text-accent col_ gap-1  items-center px-2">
              <h4 className="text-sec flex-1">
                Total Cards{" "}
                <span className="font-bold"> {cards && cards?.length}</span>
              </h4>
              <Pie value={score} />
              <h3 className="font-semibold">score</h3>
            </div>
            <div className="flex-[2] p-2 flex flex-wrap gap-4 items-start">
              <PlayFinishResultItem
                cards={cards}
                level="easy"
                text={LEVEL_EASY + "ed"}
                filter={easyCards}
                onSelect={onItemSelect}
              />
              <PlayFinishResultItem
                cards={cards}
                level="normal"
                text={LEVEL_NORMAL + "ed"}
                filter={normalCards}
                onSelect={onItemSelect}
              />
              <PlayFinishResultItem
                cards={cards}
                level="hard"
                text={LEVEL_HARD + "en"}
                filter={hardCards}
                onSelect={onItemSelect}
              />
            </div>
          </div>
        </div>
      </div>
      <PlayResultPop
        cards={filter(selected.text)}
        selected={selected}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
