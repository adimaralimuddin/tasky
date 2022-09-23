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
      <div className="flex flex-col items-center justify-center py-3">
        <h1 className="font-bold text-green-400">finish</h1>
        <h2>Quiz Results</h2>
        <BtnSec onClick={onBackHandler}>repeat</BtnSec>
      </div>
      <div className="px-3 text-slate-500">
        <p>cards: {result?.length}</p>
      </div>
      <div>
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
    <div className="shadow-md ring-1 bg-slate-50 ring-slate-200 p-2 my-5 rounded-xl ">
      <div className="flex items-center gap-3 text-slate-400">
        <p className={res?.wrong?.length > 0 ? "text-red-400" : ""}>
          wrong {!singleWrong && res?.wrong?.length}
        </p>
        <p className={res?.correct?.length > 0 ? "text-green-400" : ""}>
          correct {!singleWrong && res?.correct?.length}
        </p>
      </div>
      <CardItem card={res?.card} />
    </div>
  );
}
