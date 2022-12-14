import React, { useEffect, useState } from "react";
import { CardTypes } from "../../features/card/CardType";
import useCards from "../../features/card/useCards";
import useQuiz from "../../features/quiz/useQuiz";
import useWork from "../../features/work/useWork";
import Box from "../elements/Box";
import ContentHeader from "../elements/ContentHeader";
import NoCards from "../elements/NoCards";
import CardItem from "../work/card/CardItem";
import CardQueryView from "../work/card/CardQueryView";
import QuizFinnished from "./QuizFinnished";
import QuizOptions from "./QuizOptions";
import QuizPlayOptionItem from "./QuizPlayOptionItem";

export default function QuizMainContent({ classId }: any) {
  const [playInd, setPlayInd] = useState<number>(0);
  const { work } = useWork();
  const { selectedTopic, selectedCategory } = work;
  const { category } = useCards(selectedTopic?.id);
  const cards = category(selectedCategory);
  const [optionCount, setOptionCount] = useState(
    cards?.length <= 4 ? cards?.length : 4
  );
  const [options, setOptions] = useState(
    ranNum(optionCount, cards?.length, playInd)
  );

  const [finish, setFinish] = useState(false);
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

  if (finish) {
    return (
      <QuizFinnished
        result={result}
        resetResult={() => setResult(resetResult())}
        setFinish={setFinish}
        reloadOptions={reloadOptions}
      />
    );
  }

  const Content = (
    <div className="px-3 py-2">
      <div className="flex items-center gap-2 flex-wrap ">
        <CardQueryView />
        <QuizOptions
          optionCount={optionCount}
          setOptionCount={(val: any) => {
            setOptionCount(val);
            reloadOptions(val);
          }}
        />
      </div>
      <div className="text-center mt-5">
        <p>
          {playInd} / {cards?.length}
        </p>
      </div>
      <TrivItem current={current()} />
      <div className="flex flex-wrap gap-1 p-5 ">
        {options?.map((opt) => (
          <QuizPlayOptionItem
            key={Math.random()}
            next={next}
            card={cards?.[opt]}
            current={current()}
            playInd={playInd}
            setResult={setResult}
          />
        ))}
      </div>
    </div>
  );

  return (
    <Box css="flex-1 flex flex-col  ">
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
  let x: any = new Set(ret);
  let uniqued = [...x];
  let sliced = uniqued.slice(0, count - 1);
  sliced.splice(run(count), 0, playInd);
  return sliced;
}

function TrivItem({ current }: any) {
  const { quiz } = useQuiz();
  const { side } = quiz;

  return (
    <div className="flex flex-col items-center">
      <CardItem side={side} card={current} allowOption={false} />
    </div>
  );
}
