import React, { useState } from "react";
import { SideType } from "../../features/app/appSlice";
import useStatAdder from "../../features/app/dashboard/useStatAdder";
import { CardTypes } from "../../features/card/CardType";
import { SetCardLevel } from "../../features/card/useCardLevelUpdater";

import usePlay from "../../features/play/usePlay";
import BtnBack from "../elements/BtnBack";
import ContentHeader from "../elements/ContentHeader";
import NoCards from "../elements/NoCards";
import CardItem from "../work/card/cardItem/CardItem";
import PlayButtons from "./PlayAnswerButtons";
import PlayFinish from "./playFinish/PlayFinish";
import PlayHeader from "./PlayHeader";
import PlayNav from "./PlayNavs";

interface Props {
  cards: CardTypes[];
  setCardLevel: SetCardLevel;
  setCards: any;
  hideHeader?: boolean;
  isCardEditable?: boolean;
  showAllFields?: boolean;
}
export default function PlaymainPage({
  cards,
  setCardLevel,
  setCards,
  hideHeader,
  isCardEditable,
  showAllFields,
}: Props) {
  const { addStat } = useStatAdder();

  const { muted, side: startSide } = usePlay();

  // local stated
  const [finish, setFinish] = useState<boolean>(false);
  const [playInd, setPlayInd] = useState<number>(0);
  const current: CardTypes = cards?.[playInd];
  const [side, setSide] = useState<SideType>(startSide);

  const onNextHandler = (level: string) => {
    if (muted) new Audio("/correct.mp3")?.play();
    setCardLevel(
      { cardId: current?.id, level, classId: "what" },
      {
        onSuccess(x) {
          if (cards?.length && playInd >= cards?.length - 1) {
            console.log(`finish`);
            addStat(cards);
          }
        },
      }
    );
    setCards((c_: CardTypes[]) =>
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
        hideHeader={hideHeader}
        isCardEditable={isCardEditable}
        showAllFields={showAllFields}
      />
    );
  }

  const QuizContent = (
    <div className=" pb-5 flex-1 col_ ">
      <PlayHeader />
      <div className={"flex flex-col items-center flex-1  justify-center "}>
        <PlayNav cards={cards} playInd={playInd} />
        <div
          className={
            " px-1 flex-1d rounded-xl " + (side == "backs" && "bg-indigo-400")
          }
        >
          <CardItem
            card={current}
            side={side}
            showAllFields={showAllFields}
            allowOption={false}
          />
        </div>
      </div>
      <PlayButtons onFlip={onFlipHandler} onNext={onNextHandler} side={side} />
    </div>
  );

  return (
    <div className=" container_ flex-col animate-fadein">
      {!hideHeader && (
        <ContentHeader
          Action={<BtnBack content="topic" category="all" />}
          extraPath="play"
        />
      )}
      {cards?.length && cards?.length > 0 ? (
        QuizContent
      ) : (
        <NoCards text="No Cards To Play" />
      )}
    </div>
  );
}
