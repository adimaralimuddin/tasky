import React, { useState } from "react";
import useQuiz from "../../features/quiz/useQuiz";
import Box from "../elements/Box";
import Select from "../elements/Select";

type props = {
  optionCount: number;
  setOptionCount: any;
};

export default function QuizOptions({ optionCount, setOptionCount }: props) {
  const [open, setOpen] = useState(false);
  const { quiz, setSide, setSingleWrong, setSpeed, setSound } = useQuiz();
  const { side, singleWrong, speed, sound } = quiz;
  return (
    <div>
      <p
        onClick={() => setOpen((p) => !p)}
        className="text-sm cursor-pointer font-medium text-prime "
      >
        Quiz Options
      </p>
      {open && (
        <span className="relative z-10">
          <div className="absolute top-3 animate-pop">
            <div className="card-all  col_">
              <Select
                defaultValue={optionCount}
                options={[[2], [3], [4], [5], [6]]}
                onInput={(optCount: number) => setOptionCount(optCount)}
                text="option counts"
                css="flex items-center justify-between"
              />
              <Select
                defaultValue={[side]}
                options={[["fronts"], ["backs"]]}
                onInput={(side_: string) => setSide(side_)}
                text="starting side"
                css="flex items-center justify-between"
              />
              <Select
                defaultValue={[singleWrong]}
                text="single Wrong"
                options={[[false], [true]]}
                onInput={(val: any) => setSingleWrong(val)}
                css="flex items-center justify-between"
              />
              <Select
                text="pause duration"
                options={[
                  [0, 0],
                  [0.1],
                  [0.2],
                  [0.5],
                  [0.7],
                  [1],
                  [1.5],
                  [2],
                  [2.5],
                ]}
                defaultValue={[speed]}
                onInput={(val: number) => setSpeed(val)}
                css="flex items-center justify-between"
              />
              <Select
                text="sound"
                options={[
                  ["on", 1],
                  ["off", 0],
                ]}
                defaultValue={[speed]}
                onInput={(val: 0 | 1) => setSound(val)}
                css="flex items-center justify-between"
              />
            </div>
          </div>
        </span>
      )}
    </div>
  );
}
