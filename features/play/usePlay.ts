import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { SideType } from "../app/appSlice";
import { playActions } from "./PlaySlice";

function usePlay() {
  const player = useSelector((s: RootState) => s.player);
  const patch = useDispatch();

  return {
    ...player,
    setSide: (side: SideType) => patch(playActions.setSide(side)),
    setMuted: (muted: boolean) => patch(playActions.setMuted(muted)),
  };
}

export default usePlay;
