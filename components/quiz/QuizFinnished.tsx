import React from "react";
import { CardTypes } from "../../features/card/CardType";
import useQuiz from "../../features/quiz/useQuiz";
import Box from "../elements/Box";
import BtnBack from "../elements/BtnBack";
import BtnSec from "../elements/BtnSec";
import CardItem from "../work/card/CardItem";
type props = {
  result: any[];
  setFinish: any;
  resetResult: Function;
  reloadOptions: any;
};
export default function QuizFinnished({
  result,
  setFinish,
  resetResult,
  reloadOptions,
}: props) {
  const onBackHandler = () => {
    setFinish(false);
    reloadOptions();
    resetResult();
  };
  const { quiz } = useQuiz();
  const { singleWrong } = quiz;
  return (
    <Box css="flex-1">
      <BtnBack onClick={onBackHandler} />
      <div className="flex flex-col items-center justify-center py-10">
        <h1 className="text-4xl font-bold text-indigo-400 dark:text-indigo-300">
          finish!
        </h1>
        <h2>Quiz Results</h2>
        <BtnSec css="my-3" onClick={onBackHandler}>
          Repeat
        </BtnSec>
      </div>
      <div className="px-3 text-slate-500">
        <p>cards: {result?.length}</p>
      </div>
      <div className="px-3">
        {result?.map((res) => (
          <ResItem res={res} singleWrong={singleWrong} key={res?.card?.id} />
        ))}
      </div>
    </Box>
  );
}

type ResItemType = {
  card: CardTypes;
  wrong: boolean[];
  correct: boolean[];
};

type ResetItemProps = { res: ResItemType; singleWrong: boolean };
function ResItem({ res, singleWrong }: ResetItemProps) {
  return (
    <div className="shadow-md ring-1 bg-slate-50 dark:bg-slate-600 ring-slate-200 p-2 my-5 rounded-xl ">
      <div className="flex px-2 items-center gap-3 text-slate-400">
        <p
          className={
            res?.wrong?.length > 0 ? " text-red-400 dark:text-red-400 " : ""
          }
        >
          wrong {!singleWrong && res?.wrong?.length}
        </p>
        <p
          className={
            res?.correct?.length > 0 ? "text-green-400 dark:text-green-400" : ""
          }
        >
          correct {!singleWrong && res?.correct?.length}
        </p>
      </div>
      <CardItem card={res?.card} css="my-0 mt-2 mb-2" />
    </div>
  );
}
