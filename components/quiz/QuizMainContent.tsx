import React, { useEffect, useState } from "react";
import useCategoryGetter from "../../features/app/category/useCategoryGetter";
import { CardTypes } from "../../features/card/CardType";
import useCards from "../../features/card/useCards";
import useQuizOptions from "../../features/quiz/useQuizOptions";
import useTopicGetter from "../../features/topic/useTopicGetter";
import BtnBack from "../elements/BtnBack";
import ContentHeader from "../elements/ContentHeader";
import NoCards from "../elements/NoCards";
import CardItem from "../work/card/cardItem/CardItem";
import CardQueryView from "../work/viewer/CardQueryView";
import QuizFinnished from "./QuizFinnished";
import QuizOptions from "./QuizOptions";
import QuizPlayOptionItem from "./QuizPlayOptionItem";

export default function QuizMainContent() {
  const [playInd, setPlayInd] = useState<number>(0);

  const selectedTopicId = useTopicGetter().getSelectedTopicId();
  const selectedCategory = useCategoryGetter().getSelectedCategory();

  const { categorizeCards } = useCards(selectedTopicId);
  const [optionCount, setOptionCount] = useState(4);
  const cards = categorizeCards(selectedCategory);
  const [options, setOptions] = useState<any[]>();

  const [finish, setFinish] = useState(false);
  const [result, setResult] = useState<any>([]);
  const [hasResults, setHasResults] = useState(false);

  useEffect(() => {
    setResult(resetResult());
  }, []);

  useEffect(() => {
    if (cards?.length && !hasResults) {
      console.log(`set option count: `, cards?.length ? 4 : cards?.length);

      setOptionCount((p) => (p >= cards?.length ? 4 : cards?.length));
      setHasResults(true);
      reloadOptions();
    }
  }, [cards]);

  function resetResult() {
    return cards
      ?.map((card: CardTypes) => ({
        sorta: Math.floor(Math.random() * 100),
        sortb: Math.floor(Math.random() * 100),
        card,
        correct: [],
        wrong: [],
        answer: [],
      }))
      .sort((c) => c.sorta - c.sortb);
  }

  const current = () => result?.[playInd]?.card;

  const reloadOptions = (optionCount_ = optionCount, modifier = 0) => {
    setOptions(
      generatePlayOptionsLists(optionCount, cards?.length, playInd + modifier)
    );
  };

  const next = () => {
    console.log(`optionCount `, optionCount);

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
    <div className=" py-2 flex-1 col_ animate-fadein">
      <div className="flex items-center gap-2 flex-wrap ">
        {optionCount}
        <QuizOptions
          reloadOptions={reloadOptions}
          optionCount={optionCount}
          setOptionCount={setOptionCount}
        />
        <CardQueryView />
      </div>
      <div className="text-center mt-5">
        <p>
          {playInd} / {cards?.length}
        </p>
      </div>
      <div className="mt-[5%]">
        <TrivItem current={current()} />
        <div className="flex flex-wrap gap-1 p-5 ">
          {options?.map((opt) => (
            <QuizPlayOptionItem
              key={Math.random()}
              next={next}
              card={result?.[opt]?.card}
              current={current()}
              playInd={playInd}
              setResult={setResult}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col  ">
      <ContentHeader Action={<BtnBack content="topic" />} extraPath="quiz" />
      {cards?.length > 0 ? Content : <NoCards text="No Cards For Quiz" />}
    </div>
  );
}

function TrivItem({ current }: any) {
  const { quiz: quizOptions } = useQuizOptions();

  const { side } = quizOptions;

  return (
    <div className="flex flex-col items-center">
      <CardItem side={side} card={current} allowOption={false} />
    </div>
  );
}

// this ranNum fn accepts optioncounts defaults to 3, length as cards length default to 11, playind defaults to 0.
// and will return an array of random numbers between 0 to length, length of count, one of the element will be equal to playInd
// this will generate a new options lists for play options cards
function generatePlayOptionsLists(count = 3, length = 11, playInd = 0) {
  console.log(`reload option`, { count, length, playInd });

  // run function return a random number from 0 to max
  const run = (max = length) => Math.floor(Math.random() * max);
  // create and store 30 random numbers
  let ret: number[] = [];
  for (let i = 1; i <= 30; i++) {
    let ran = run();
    ret.push(ran);
  }
  // exclude any number that is equal to playInd
  ret = ret.filter((i) => i != playInd);
  let x: any = new Set(ret);
  // make all numbers unique, also assign to unique variable
  let uniqued = [...x];
  // trim the 30 lists to just the option count, also assign to sliced variable
  let sliced = uniqued.slice(0, count - 1);
  // finally insert the playInd anywhere from the list index
  sliced.splice(run(count), 0, playInd);
  return sliced;
}
