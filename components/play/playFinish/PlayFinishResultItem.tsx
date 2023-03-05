import React from "react";
import { CardTypes } from "../../../features/card/CardType";
import _usePercentage from "../../../lib/utils/_usePercentage";

export default function PlayFinishResultItem({
  level,
  filter,
  onSelect,
  text,
  cards,
}: {
  level: string;
  text: string;
  filter: any;
  onSelect: any;
  cards: CardTypes[] | undefined;
}) {
  const onSelectHandler = () =>
    onSelect(level, _usePercentage(filter?.length, cards?.length || 0));

  const color = () =>
    level == "easy"
      ? " text-teal-400 dark:text-teal-200 "
      : level == "normal"
      ? " text-blue-400 dark:text-lime-300 "
      : " text-pink-400 dark:text-red-300 ";
  return (
    <div
      onClick={onSelectHandler}
      className="flex-[2] p-3 rounded-xl ring-1 bg-layer-1 ring-slate-200 dark:ring-slate-500d dark:ring-0 cursor-pointer card-ring "
    >
      <span className={"flex flex-col text-center "}>
        <p className={"text-accent"}>{text || level}</p>
        <p className={"font-bold text-pink-400d pt-1  " + color()}>
          {_usePercentage(filter?.length, cards?.length || 0)} %
          {/* {Math.floor((filter?.length / (cards?.length || 0)) * 100)} % */}
        </p>
        <p className={"text-[.95rem] text-phar "}>{filter?.length} cards</p>
      </span>
    </div>
  );
}
