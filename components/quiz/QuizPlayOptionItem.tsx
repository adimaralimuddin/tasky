import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardTypes } from "../../features/card/CardType";
import useQuiz from "../../features/quiz/useQuiz";
import CardItem from "../work/card/CardItem";
type props = {
  card: CardTypes;
  next: any;
  current: CardTypes;
  playInd: number;
  setResult: any;
};
export default function QuizPlayOptionItem({
  card,
  next,
  current,
  playInd,
  setResult,
}: props) {
  const [correct, setCorrect] = useState(false);
  const [wasWrong, setWasWrong] = useState(false);
  const [isWrong, setIsWrong] = useState(false);
  const { quiz, setHasChosen } = useQuiz();
  const { hasChosen, side, singleWrong, speed } = quiz;

  useEffect(() => {
    setCorrect(false);
    setIsWrong(false);
  }, [playInd]);

  useEffect(() => {
    setWasWrong(false);
  }, [card]);

  const pass = () => {
    next();
    setHasChosen(false);
  };

  const updateResult = (value: boolean = true) => {
    setResult((p: any[]) => {
      if (value === true) {
        p?.[playInd]?.correct?.push(value);
      } else {
        p?.[playInd]?.wrong?.push(value);
      }
      return p;
    });
  };

  const gotAnswer = (func: any) => {
    setTimeout(() => func?.(), speed * 1000);
  };

  const onSelectHandler = () => {
    if (hasChosen) return;
    if (card?.id == current?.id) {
      new Audio("/correct.mp3")?.play();
      setHasChosen(true);
      setCorrect(true);
      updateResult();
      gotAnswer(() => {
        setCorrect(false);
        pass();
      });
    } else {
      new Audio("/wrong.mp3")?.play();
      setCorrect(false);
      setWasWrong(true);
      updateResult(false);
      gotAnswer(() => {
        setWasWrong(false);
      });
      if (singleWrong) {
        setHasChosen(true);
        setIsWrong(true);
        gotAnswer(() => {
          pass();
        });
      }
    }
  };

  const isCorrect = (a: any = "", b: any = "") => (correct ? a : b);
  const isWasWrong = (a: any = "", b: any = "") => (wasWrong ? a : b);

  return (
    <div
      onClick={onSelectHandler}
      className={
        "flex-1  ring-2 ring-slate-200 rounded-xl cursor-pointer m-1 animate-wiggle max-w-[400px]  " +
        isCorrect(
          "ring-green-400 hover:ring-green-500",
          isWasWrong(
            "ring-red-400 dark:ring-red-400",
            !hasChosen && "hover:ring-indigo-400 hover:shadow-lg"
          )
        )
      }
    >
      {correct && (
        <div className="relative">
          <div className="absolute top-0 left-0 dbg-red-400">
            <Image src={"/img/check.png"} width={50} height={50} alt="" />
          </div>
        </div>
      )}
      {isWrong && (
        <div className="relative">
          <div className="absolute top-0 left-0 dbg-red-400">
            <Image src={"/img/wrong.png"} width={50} height={50} alt="" />
          </div>
        </div>
      )}
      <CardItem
        card={card}
        side={side == "fronts" ? "backs" : "fronts"}
        allowOption={false}
        css={
          "m-0 flexd my-0 flex-1 ring-0  h-full " +
          isWasWrong("dark:ring-red-400") +
          isCorrect("dark:ring-green-400")
        }
        imageViewer={false}
      />
    </div>
  );
}
