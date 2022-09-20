import React, { useState } from "react";
import { CardTypes } from "../../features/card/CardType";
import useCards from "../../features/card/useCards";
import useWork from "../../features/work/useWork";
import Box from "../elements/Box";
import ContentHeader from "../elements/ContentHeader";
import NoCards from "../elements/NoCards";
import CardItem from "../work/card/CardItem";
import CardQueryView from "../work/card/CardQueryView";
import QuizFinnished from "./QuizFinnished";
import QuizOptions from "./QuizOptions";
import QuizPlayHeader from "./QuizPlayHeader";
import QuizPlayOptionItem from "./QuizPlayOptionItem";

export default function QuizMainContent({ classId }: { classId: string }) {
  const [playInd, setPlayInd] = useState<number>(0);
  const [singleWrong, setSingleWrong] = useState(false);
  const { work } = useWork();
  const { selectedTopic, selectedCategory } = work;
  const { category } = useCards(selectedTopic?.id);
  const cards = category(selectedCategory);
  const [optionCount, setOptionCount] = useState(4);
  const [options, setOptions] = useState(
    ranNum(optionCount, cards?.length - 1, playInd)
  );
  const [finish, setFinish] = useState(false);
  const [side, setSide] = useState("fronts");
  const [hasChoosen, setHasChoosen] = useState(false);
  const [speed, setSpeed] = useState(0.5);
  const [result, setResult] = useState(resetResult());

  function resetResult() {
    return cards?.map((card: CardTypes) => ({
      card,
      correct: [],
      wrong: [],
      answer: [],
    }));
  }

  const current = () => cards?.[playInd];

  const reloadOptions = (optionCount_ = optionCount, modifier = 0) =>
    setOptions(ranNum(optionCount_, cards?.length, playInd + modifier));

  const next = () => {
    reloadOptions(undefined, 1);
    setPlayInd((p) => {
      if (p >= cards?.length - 1) {
        setFinish(true);
        return 0;
      }
      return p + 1;
    });
  };

  const onSelectOption = (selected: CardTypes, correct: boolean) => {
    const pass = () => {
      setHasChoosen(true);
      setTimeout(() => {
        setHasChoosen(false);
        next();
      }, speed * 1000);
    };
    if (correct) {
      pass();
    } else {
      if (singleWrong) {
        pass();
      }
    }
  };

  if (finish) {
    return (
      <QuizFinnished
        result={result}
        resetResult={() => setResult(resetResult())}
        setFinish={setFinish}
        reloadOptions={reloadOptions}
        singleWrong={singleWrong}
      />
    );
  }

  const Content = (
    <>
      <div className="flex items-center gap-2 flex-wrap">
        <CardQueryView />
        <QuizOptions
          side={side}
          setSide={setSide}
          optionCount={optionCount}
          setOptionCount={(val) => {
            setOptionCount(val);
            reloadOptions(val);
          }}
          singleWrong={singleWrong}
          setSingleWrong={setSingleWrong}
          speed={speed}
          setSpeed={setSpeed}
        />
      </div>
      <div className="text-center mt-5">
        <p>
          {playInd} / {cards?.length}
        </p>
      </div>
      <div className="flex flex-col items-center">
        <CardItem side={side} card={current()} allowOption={false} />
      </div>
      <div className="flex flex-wrap gap-1">
        {options?.map((opt) => (
          <QuizPlayOptionItem
            onSelect={onSelectOption}
            side={side}
            card={cards?.[opt]}
            opt={opt}
            current={current()}
            hasChoosen={hasChoosen}
            playInd={playInd}
            result={result}
            setResult={setResult}
            singleWrong={singleWrong}
          />
        ))}
      </div>
    </>
  );

  return (
    <Box css="flex-1 flex flex-col ">
      <ContentHeader />
      {cards?.length > 0 ? Content : <NoCards text="No Cards For Quiz" />}
    </Box>
  );
}

function ranNum(count = 3, length = 11, playInd = 0) {
  const run = (max = length) => Math.floor(Math.random() * max);
  let ret: number[] = [];
  for (let i = 1; i <= 30; i++) {
    let ran = run();
    ret.push(ran);
  }
  ret = ret.filter((i) => i != playInd);
  let uniqued = [...new Set(ret)];
  let sliced = uniqued.slice(0, count - 1);
  sliced.splice(run(count), 0, playInd);
  return sliced;
}
