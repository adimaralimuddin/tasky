import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardTypes } from "../../features/card/CardType";
import useQuizOptions from "../../features/quiz/useQuizOptions";
import CardItem from "../work/card/cardItem/CardItem";
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
  const { quiz, setHasChosen } = useQuizOptions();
  const { hasChosen, side, singleWrong, speed, sound } = quiz;
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
      if (sound) new Audio("/correct.mp3")?.play();
      setHasChosen(true);
      setCorrect(true);
      gotAnswer(() => {
        updateResult();
        setCorrect(false);
        pass();
      });
    } else {
      if (sound) new Audio("/wrong.mp3")?.play();
      // console.log(`wrong`);

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
        "flex-1 p-[2px]d rounded-2xl cursor-pointer m-1  max-w-[400px]   " +
        isCorrect(
          "animate-pop ",
          isWasWrong(
            " animate-wiggle  ",
            !hasChosen && " hover:ring-text-accent hover:shadow-lg"
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
          "m-0 my-0 flex-1 ring-1  h-full " +
          isWasWrong("ring-0  border-2 border-pink-400 ") +
          isCorrect("ring-0  border-2 border-green-400 ")
        }
        imageViewer={false}
      />
    </div>
  );
}
