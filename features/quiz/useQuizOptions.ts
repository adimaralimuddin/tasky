import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";

import {
  setHasChosen,
  setSide,
  setSingleWrong,
  setSound,
  setSpeed,
  togSide,
  togSingleWrong,
} from "./quizOptionSlice";

export default function useQuizOptions() {
  const patch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quizOption);

  return {
    quiz,
    setHasChosen: (val: boolean) => patch(setHasChosen(val)),
    setSide: (side: string) => patch(setSide(side)),
    togSide: () => patch(togSide()),
    setSingleWrong: (val: boolean) => patch(setSingleWrong(val)),
    togSingleWrong: () => patch(togSingleWrong),
    setSpeed: (speed: number) => patch(setSpeed(speed)),
    setSound: (muted: boolean) => patch(setSound(muted)),
  };
}
