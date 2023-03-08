import React, { useState } from "react";
import { SideType } from "../../features/app/appSlice";
import useCategoryGetter from "../../features/app/category/useCategoryGetter";
import { CardTypes } from "../../features/card/CardType";
import { useCardMutation } from "../../features/card/useCardMutation";
import useCards from "../../features/card/useCards";
import usePlay from "../../features/play/usePlay";
import useTopicGetter from "../../features/topic/useTopicGetter";
import BtnBack from "../elements/BtnBack";
import ContentHeader from "../elements/ContentHeader";
import NoCards from "../elements/NoCards";
import TopicTitle from "../elements/TopicTitle";
import CardItem from "../work/card/cardItem/CardItem";
import PlayButtons from "./PlayAnswerButtons";
import PlayFinish from "./playFinish/PlayFinish";
import PlayHeader from "./PlayHeader";
import PlayNav from "./PlayNavs";

export default function PlaymainPage({}: any) {
  const topic = useTopicGetter().getSelectedTopic();
  const { categorizeCards } = useCards(topic?.id);
  const { setCardLevel } = useCardMutation(topic?.id);
  const selectedCategory = useCategoryGetter().getSelectedCategory();
  const cards_ = categorizeCards(selectedCategory);
  const [cards, setCards] = useState(cards_);

  const { muted, side: startSide } = usePlay();

  // local stated
  const [finish, setFinish] = useState<boolean>(false);
  const [playInd, setPlayInd] = useState<number>(0);
  const current: CardTypes = cards?.[playInd];
  const [side, setSide] = useState<SideType>(startSide);

  const onNextHandler = (level: string) => {
    if (muted) new Audio("/correct.mp3")?.play();
    setCardLevel({ cardId: current?.id, level });
    setCards((c_) =>
      c_?.map((c) => (c?.id === current?.id ? { ...c, level } : c))
    );
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
    <div className=" pb-5 flex-1 col_   ">
      <PlayHeader />
      <div className={"flex flex-col items-center flex-1  justify-center "}>
        <PlayNav cards={cards} playInd={playInd} />
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
    <div className=" container_ flex-col animate-fadein">
      <ContentHeader
        Action={<BtnBack content="topic" category="all" />}
        extraPath="play"
      />
      {cards?.length && cards?.length > 0 ? (
        QuizContent
      ) : (
        <NoCards text="No Cards To Play" />
      )}
    </div>
  );
}
