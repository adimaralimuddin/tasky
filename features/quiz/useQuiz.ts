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
} from "./quizSlice";

export default function useQuiz() {
  const patch = useDispatch();
  const quiz = useSelector((state: RootState) => state.quiz);

  const next = () => {
    alert("next");
  };

  return {
    quiz,
    next,
    setHasChosen: (val: boolean) => patch(setHasChosen(val)),
    setSide: (side: string) => patch(setSide(side)),
    togSide: () => patch(togSide()),
    setSingleWrong: (val: boolean) => patch(setSingleWrong(val)),
    togSingleWrong: () => patch(togSingleWrong),
    setSpeed: (speed: number) => patch(setSpeed(speed)),
    setSound: (sound: 1 | 0) => patch(setSound(!!Number(sound))),
  };
}
