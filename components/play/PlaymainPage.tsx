import React, { useState } from "react";
import useCategoryGetter from "../../features/app/category/useCategoryGetter";
import { CardTypes } from "../../features/card/CardType";
import { useCardMutation } from "../../features/card/useCardMutation";
import useCards from "../../features/card/useCards";
import useTopicGetter from "../../features/topic/useTopicGetter";
import BtnBack from "../elements/BtnBack";
import ContentHeader from "../elements/ContentHeader";
import NoCards from "../elements/NoCards";
import CardItem from "../work/card/CardItem";
import PlayButtons from "./PlayButton";
import PlayFinish from "./PlayFinish";
import PlayHeader from "./PlayHeader";
import PlayNav from "./PlayNavs";

export default function PlaymainPage({}: any) {
  const topic = useTopicGetter().getSelectedTopic();
  const { categorizeCards } = useCards(topic?.id);
  const { setCardLevel } = useCardMutation(topic?.id);
  const selectedCategory = useCategoryGetter().getSelectedCategory();
  const cards = categorizeCards(selectedCategory);

  // local stated
  const [finish, setFinish] = useState<boolean>(false);
  const [playInd, setPlayInd] = useState<number>(0);
  const current: CardTypes = cards?.[playInd];
  const [startSide, setStartSide] = useState<string>("fronts");
  const [side, setSide] = useState<string>(startSide);

  const onNextHandler = (level: string) => {
    new Audio("/correct.mp3")?.play();
    setCardLevel({ cardId: current?.id, level });
    setPlayInd((p) => {
      if (cards?.length && p >= cards?.length - 1) {
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
    <div className=" pb-5 flex-1 col_  ">
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
    <div className=" container_ flex-col ">
      <ContentHeader Action={<BtnBack content="category" />} />
      {cards?.length && cards?.length > 0 ? (
        QuizContent
      ) : (
        <NoCards text="No Cards To Play" />
      )}
    </div>
  );
}
