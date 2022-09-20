import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardTypes } from "../../features/card/CardType";
import CardItem from "../work/card/CardItem";
type props = {
  card: CardTypes;
  opt: number;
  side: string;
  onSelect: any;
  current: CardTypes;
  hasChoosen: boolean;
  playInd: number;
  result: any;
  setResult: any;
  singleWrong: boolean;
};
export default function QuizPlayOptionItem({
  card,
  opt,
  side,
  onSelect,
  current,
  hasChoosen,
  playInd,
  setResult,
  singleWrong,
}: props) {
  const [correct, setCorrect] = useState(false);
  const [wasWrong, setWasWrong] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  useEffect(() => {
    setCorrect(false);
    setIsWrong(false);
  }, [playInd]);

  useEffect(() => {
    setWasWrong(false);
  }, [card]);

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

  const onSelectHandler = () => {
    if (hasChoosen) {
      return;
    }
    if (card?.id == current?.id) {
      setCorrect(true);
      updateResult();
      if (!hasChoosen) {
        onSelect(card, true);
      }
    } else {
      if (!hasChoosen) {
        setCorrect(false);
        setWasWrong(true);
        updateResult(false);
        onSelect(card, false);
      }
      setTimeout(() => setWasWrong(false), 1000);
      if (singleWrong) {
        setIsWrong(true);
      }
    }
  };

  const isCorrect = (a: any = "", b: any = "") => (correct ? a : b);
  const isWasWrong = (a: any = "", b: any = "") => (wasWrong ? a : b);

  return (
    <div
      onClick={onSelectHandler}
      className={
        "flex-1  ring-2 ring-slate-200 rounded-xl cursor-pointer m-1 animate-wiggle  " +
        isCorrect(
          "ring-green-400 hover:ring-green-500",
          isWasWrong(
            "ring-red-400",
            !hasChoosen && "hover:ring-indigo-400 hover:shadow-lg"
          )
        ) +
        (isWrong && hasChoosen ? " ring-red-400 " : "")
      }
    >
      {isCorrect(
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
        css="m-0 flexd my-0 flex-1 ring-0 h-full "
        imageViewer={false}
      />
    </div>
  );
}
