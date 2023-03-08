import React, { useState } from "react";
import { LevelType } from "../../../features/app/appSlice";
import { CardTypes } from "../../../features/card/CardType";
import { LEVEL_EASY, LEVEL_HARD, LEVEL_NORMAL } from "../../../lib/public";
import {
  _useScoreColors,
  _useScoremessage,
} from "../../../lib/utils/_utilsClasses";
import BtnBack from "../../elements/BtnBack";

import Pie from "../../elements/Pie";
import TopicTitle from "../../elements/TopicTitle";
import CardItem from "../../work/card/cardItem/CardItem";

import PlayFinishResultItem from "./PlayFinishResultItem";
import PlayResultPop from "./PlayResultPop";

type props = {
  cards?: CardTypes[];
  finish: boolean;
  setFinish: any;
  playInd: number;
  setPlayInd: any;
};
type Selected = {
  text: string;
  level: LevelType;
  value: number;
};
export default function PlayFinish({
  setFinish,
  cards = [],
  setPlayInd,
}: props) {
  const [selected, setSelected] = useState<Selected>({
    text: "",
    value: 0,
    level: "all",
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

  console.log(`cards`, cards);

  const onRepeatHandler = () => {
    setPlayInd(0);
    setFinish(false);
  };

  const onItemSelect = (selected_: Selected) => {
    setOpen(true);
    setSelected(selected_);
  };

  return (
    <div className="flex-1 animate-fadein">
      <div className="flex flex-col flex-1 ">
        <div className="flex_">
          <TopicTitle extraPath="play finish" />
          <BtnBack />
        </div>
        <div className="flex justify-between py-[3%] items-start max-w-3xl">
          <div>
            <h1 className="font-bold  text-3xl text-value ">Play Completed!</h1>
            <h2 className={" font-bold text-accent " + _useScoreColors(score)}>
              {_useScoremessage(score)}
            </h2>
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
      <div>
        <h3 className="text-accent font-semibold my-2 mt-4">Result Cards</h3>

        {cards?.map((c) => (
          <div key={c.id}>
            <CardItem card={c} />
          </div>
        ))}
      </div>
      <PlayResultPop
        cards={filter(selected.level)}
        selected={selected}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
