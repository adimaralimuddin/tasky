import React, { useState } from "react";
import { CardTypes } from "../../features/card/CardType";
import { useCardMutation } from "../../features/card/useCardMutation";
import useCards from "../../features/card/useCards";
import useWork from "../../features/work/useWork";
import Box from "../elements/Box";
import ContentHeader from "../elements/ContentHeader";
import NoCards from "../elements/NoCards";
import CardItem from "../work/card/CardItem";
import PlayButtons from "./PlayButton";
import PlayFinish from "./PlayFinish";
import PlayHeader from "./PlayHeader";
import PlayNav from "./PlayNavs";

export default function PlaymainPage({}: any) {
  const { work } = useWork();
  const { selectedTopic: topic } = work;
  const { setCardLevel } = useCardMutation(topic?.id);
  const { category } = useCards(topic?.id);
  const cards = category(work.selectedCategory);

  // local state
  const [finish, setFinish] = useState<boolean>(false);
  const [playInd, setPlayInd] = useState<number>(0);
  const current: CardTypes = cards?.[playInd];
  const [startSide, setStartSide] = useState<string>("fronts");
  const [side, setSide] = useState<string>(startSide);

  const onNextHandler = (level: string) => {
    new Audio("/correct.mp3")?.play();
    setCardLevel({ cardId: current?.id, level });
    setPlayInd((p) => {
      if (p >= cards?.length - 1) {
        setFinish(true);
        return 0;
      }
      return p + 1;
    });
    setSide(startSide);
  };

  const onFlipHandler = () => {
    setSide((side: string) => (side == "fronts" ? "backs" : "fronts"));
  };

  if (finish) {
    return (
      <PlayFinish
        finish={finish}
        setFinish={setFinish}
        cards={cards}
        playInd={playInd}
        setPlayInd={setPlayInd}
      />
    );
  }

  const QuizContent = (
    <div className=" pb-5 flex-1 col_">
      <PlayHeader startSide={startSide} setStartSide={setStartSide} />
      <div
        className={"flex flex-col items-center flex-1  justify-center ring-1d"}
      >
        <PlayNav cards={cards} setPlayInd={setPlayInd} playInd={playInd} />
        <div
          className={
            " px-1 flex-1d rounded-xl " + (side == "backs" && "bg-indigo-400")
          }
        >
          <CardItem card={current} side={side} />
        </div>
      </div>
      <PlayButtons onFlip={onFlipHandler} onNext={onNextHandler} side={side} />
    </div>
  );

  return (
    <div className=" container_ ">
      <ContentHeader />
      {cards?.length > 0 ? QuizContent : <NoCards text="No Cards To Play" />}
    </div>
  );
}
