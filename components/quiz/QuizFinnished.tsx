import React, { useState } from "react";
import { CardTypes } from "../../features/card/CardType";
import useQuiz from "../../features/quiz/useQuiz";
import useViewer from "../../features/viewer/useViewer";
import _usePercentage from "../../lib/utils/_usePercentage";
import Box from "../elements/Box";
import BtnBack from "../elements/BtnBack";
import BtnSec from "../elements/BtnSec";
import Modal from "../elements/Modal";
import Pie from "../elements/Pie";
import TopicTitle from "../elements/TopicTitle";
import CardItem from "../work/card/cardItem/CardItem";
import CardQuery from "../work/card/CardQuery";
import CardQueryView from "../work/viewer/CardQueryView";
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

  const pointsCards = result?.filter((c) => c?.correct?.includes(true));
  const wrongCards = result?.filter((c) => c?.wrong?.includes(false));

  return (
    <div className="flex-1 ">
      <div className="flex_  gap-0 justify-between flex-wrap  overflow-hidden">
        <TopicTitle extraPath="quiz finished" />
        <BtnBack onClick={onBackHandler} />
      </div>
      <div className="flex_  flex-wrap justify-between  py-[3%] max-w-3xl">
        <div>
          <h1 className="text-2xl sm:text-3xl text-value font-bold ">
            Quiz Completed!
          </h1>
          <h2 className="font-bold text-accent">okay super dooper cool!</h2>
        </div>
        <button className=" btn-prime my-3" onClick={onBackHandler}>
          Repeat
        </button>
      </div>
      <h3 className="text-accent font-semibold my-2">Result Stats</h3>

      <div className="card gap-3 card-shadow max-w-3xl min-h-[160px] px-3 text-slate-500 flex-wrap">
        <div className=" min-w-[150px] text-accent col_ gap-1  items-center px-2">
          <h4 className="text-sec flex-1">
            Total Cards <span className="font-bold">{result?.length}</span>
          </h4>
          <Pie value={_usePercentage(pointsCards?.length, result?.length)} />
          <h3 className="font-semibold">score</h3>
        </div>
        <div className="flex-1 col_ sm:flex-row ">
          <ResultGroups results={pointsCards} text="correct" total={result} />
          <ResultGroups results={wrongCards} text="wrong" total={result} />
        </div>
      </div>
      <div className="py-3 pt-6 col_">
        <h3 className="text-accent font-semibold ">Quiz Results</h3>
        {result?.map((res) => (
          <ResItem res={res} singleWrong={singleWrong} key={res?.card?.id} />
        ))}
      </div>
    </div>
  );
}

type ResItemType = {
  card: CardTypes;
  wrong: boolean[];
  correct: boolean[];
};

type ResetItemProps = { res: ResItemType; singleWrong: boolean };
function ResItem({ res, singleWrong }: ResetItemProps) {
  const viewer = useViewer();
  return (
    <div className="rounded-xl pb-[1px] ">
      <div className="flex px-2 items-center gap-3 text-slate-400 text-sm">
        <p
          className={
            res?.wrong?.length > 0 ? " text-pink-300 dark:text-pink-300 " : ""
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
      {/* <div className="ring-prime"> */}
      <CardItem
        card={res?.card}
        side={viewer.side}
        css="my-[3px] rounded-non"
        index={true}
      />
      {/* </div> */}
    </div>
  );
}

function ResultGroups({
  results,
  text,
  total,
}: {
  results: ResItemType[];
  text: string;
  total: ResItemType[];
}) {
  return (
    <div className="flex-[2] p-3 rounded-xl ring-1 bg-layer-1 ring-slate-200 dark:ring-slate-500d dark:ring-0 ">
      <header className="flex_ justify-between pb-2 text-accent">
        <p className="font-semibold col_d gap-0">
          {text}
          <span className=" px-3 font-bold text-value">
            {Math.floor((results?.length / total?.length) * 100)}%
          </span>
        </p>
        <p className="text-sec">cards {results?.length}</p>
      </header>
      <div className="flex  gap-2 text-phar">
        <div className="flex-1 ">
          <ResultGroup
            text="remembered"
            cards={results?.filter(({ card }) => card?.level === "easy")}
          />
          <ResultGroup
            text="repeated"
            cards={results?.filter(({ card }) => card?.level === "normal")}
          />
          <ResultGroup
            text="forgotten"
            cards={results?.filter(({ card }) => card?.level === "hard")}
          />
        </div>
        <div className="flex-1">
          <ResultGroup
            text="completed"
            cards={results?.filter(({ card }) => card?.category === "passed")}
          />
          <ResultGroup
            text="learning"
            cards={results?.filter(({ card }) => card?.category === "left")}
          />
        </div>
      </div>
    </div>
  );
}

function ResultGroup({ cards, text }: { cards: ResItemType[]; text: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <header
        onClick={() => setOpen((p) => !p)}
        className="flex_ cursor-pointer text-sm hover:underline hover:text-indigo-400 mb-1"
      >
        <h4>
          {text + " "}
          <span className="font-semibold">{cards?.length}</span>
        </h4>
      </header>
      <Modal open={open} setOpen={setOpen}>
        {(Icon) => (
          <div className="card p-0 col_ w-full max-w-3xl min-h-[200px] ">
            <Icon />
            <ResultPopView results={cards} text={text} />
          </div>
        )}
      </Modal>
    </div>
  );
}

const ResultPopView = ({
  results,
  text,
}: {
  results: ResItemType[];
  text: string;
}) => {
  const [cards, setCards] = useState(
    results.map(({ card, ...others }) => ({
      ...card,
      ...others,
    })) || []
  );

  // console.log(`cards h`, cards);

  const { quiz } = useQuiz();
  const { singleWrong } = quiz;

  return (
    <div className=" overflow-y-auto col_ flex-1 ">
      <header className="px-6 col_ gap-1   ">
        <div className="flex_">
          <h3 className="text-accent font-semibold">{text}</h3>
          <p>{results?.length} cards</p>
        </div>
        <CardQuery
          cards={
            results.map(({ card, ...others }) => ({
              ...card,
              fronts: [...card?.fronts],
              backs: [...card?.backs],
              ...others,
            })) || []
          }
          setCards={setCards}
        />
        <small>cards results: {cards?.length}</small>
      </header>

      {results?.length === 0 ? (
        <div className="flex-1 col_ ">
          <h2 className="m-auto font-semibold">No Cards</h2>
        </div>
      ) : (
        <div className="col_ gap-2 flex-1 px-6 pb-6 pl-8 overflow-y-auto overflow-x-hidden max-h-[75vh] ">
          {cards?.map((card) => (
            <div className="" key={card?.id}>
              <ResItem
                res={{ card, correct: card?.correct, wrong: card?.wrong }}
                singleWrong={singleWrong}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
