import React from "react";
import { useDispatch, useSelector } from "react-redux";
import _usePercentage from "../../lib/utils/_usePercentage";
import { RootState } from "../../store";
import { SideType } from "../app/appSlice";
import { CardTypes } from "../card/CardType";
import { playActions } from "./PlaySlice";

function usePlay() {
  const player = useSelector((s: RootState) => s.player);
  const patch = useDispatch();

  const getPlayScore = (cards: CardTypes[]) => {
    const filter = (filterType: string = "easy") =>
      cards?.filter((card) => card.level == filterType);

    const easyCards = filter("easy");
    const normalCards = filter("normal");
    const hardCards = filter("hard");

    const score = _usePercentage(
      easyCards?.length + normalCards?.length / 2,
      cards?.length
    );

    return { score, easyCards, normalCards, hardCards, filter };
  };

  return {
    ...player,
    getPlayScore,
    setSide: (side: SideType) => patch(playActions.setSide(side)),
    setMuted: (muted: boolean) => patch(playActions.setMuted(muted)),
  };
}

export default usePlay;
