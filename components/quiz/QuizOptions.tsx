import React, { useEffect, useState } from "react";
import { OptionCountType } from "../../features/quiz/quizOptionSlice";
import useQuizOptions from "../../features/quiz/useQuizOptions";
import Popy from "../elements/Popy";
import Select from "../elements/Select";
import Toggle from "../elements/Toggle";

type props = {
  reloadOptions: any;
  optionCount: number;
  setOptionCount: any;
};

export default function QuizOptions({
  reloadOptions,
  optionCount,
  setOptionCount,
}: props) {
  const [open, setOpen] = useState(false);
  const { quiz, setSide, setSingleWrong, setSpeed, setSound } =
    useQuizOptions();
  const { side, singleWrong, speed, sound } = quiz;

  return (
    <Popy
      open={open}
      setOpen={setOpen}
      header={
        <p
          onClick={() => setOpen((p) => !p)}
          className="text-sm cursor-pointer font-medium text-prime "
        >
          Quiz Options
        </p>
      }
    >
      <div className="card-all  col_">
        <Toggle wide={true} text="sound" value={sound} onToggle={setSound} />
        <Toggle
          text="single wrong"
          value={singleWrong}
          onToggle={setSingleWrong}
          wide={true}
        />
        <Select
          value={optionCount}
          options={[[2], [3], [4], [5], [6]]}
          onInput={(optionCount: OptionCountType) => {
            reloadOptions(optionCount);
            setOptionCount(optionCount);
          }}
          text="option counts"
          css="flex items-center justify-between"
        />
        <Select
          value={side}
          options={[["fronts"], ["backs"]]}
          onInput={(side_: string) => setSide(side_)}
          text="starting side"
          css="flex items-center justify-between"
        />
        <Select
          text="pause duration"
          options={[[0, 0], [0.1], [0.2], [0.5], [0.7], [1], [1.5], [2], [2.5]]}
          value={speed}
          onInput={(val: number) => setSpeed(val)}
          css="flex items-center justify-between"
        />
      </div>
    </Popy>
  );
}
