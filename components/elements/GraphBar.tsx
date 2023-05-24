import React, { useRef } from "react";
import { LevelType } from "../../features/app/appSlice";
import { StatsType } from "../../features/app/dashboard/StatTypes";
import _useGraphCount from "../../lib/utils/_useGraphCount";
import _useLevelValues from "../../lib/utils/_useLevelValues";
import _useLevelValues_ from "../../lib/utils/_useLevelValues_";

const percentage = [100, 80, 60, 40, 20, 0];

interface Props {
  statsLists: StatsType[];
  onItemClick: OnItemClick;
}

function GraphBar({ statsLists, onItemClick }: Props) {
  return (
    <div className=" flex-1 ring-d pt-3 bg-slate-200d flex flex-col max-h-[200pxd]">
      <header className="flex pb-2 ring-d justify-center flex-wrap items-center">
        <p className="text-[#37bd85] dark:text-[#60d6c8] px-2  first-letter:uppercase font-medium">
          remembered
        </p>
        <p className="text-[#7756AC] dark:text-[#ae8be7]  px-2 first-letter:uppercase font-medium">
          repeated
        </p>
        <p className="text-[#F37C7C] dark:text-[#eaa1a1] px-2  first-letter:uppercase font-medium">
          forgotten
        </p>
      </header>
      <div className="flex flex-1  gap-6 max-h-[200px] dark:opacity-70">
        <div className=" pb-2 hidden sm:flex flex-col text-sm justify-around">
          {percentage.map((p) => (
            <small className="text-slate-400 -mt-2" key={p}>
              {p}%
            </small>
          ))}
        </div>
        <div className="flex-1 flex gap-[5%] min-w-[180px] justify-start  overflow-y-hidden overflow-x-auto min-h-[150px] ring-1d">
          {statsLists?.reverse()?.map((stat, i) => (
            <div className=" flex flex-col " key={i}>
              <div className="flex flex-1 gap-1  items-end max-w-[35px]">
                <Bar
                  onClick={onItemClick}
                  cards={stat.easyCards}
                  val={stat.easy}
                  level="easy"
                />
                <Bar
                  onClick={onItemClick}
                  cards={stat.normalCards}
                  val={stat.normal}
                  level="normal"
                />
                <Bar
                  onClick={onItemClick}
                  cards={stat.hardCards}
                  val={stat.hard}
                  level="hard"
                />
              </div>
              <small className="text-[.7rem] font-normal text-slate-400">
                {stat.time}
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GraphBar;

export type OnItemClick = (selected: {
  cards: string[];
  level: LevelType;
}) => void;

interface BarTypes {
  onClick: OnItemClick;
  val: number;
  cards: string[];
  level: Exclude<LevelType, "all">;
}
const Bar = ({ level, val, cards, onClick }: BarTypes) => {
  const { counter } = _useGraphCount(val, 2);
  const sRef = useRef<HTMLDivElement>(null);

  const color = (easy = "#60d6c8", normal = "#7756AC", hard = "#F37C7C") =>
    level === "easy" ? easy : level === "normal" ? normal : hard;

  return (
    <div
      onClick={() => onClick({ cards, level })}
      onMouseMove={(e) => {
        sRef?.current ? (sRef.current.style.left = e.pageX + 10 + "px") : null;
        sRef?.current ? (sRef.current.style.top = e.pageY - 50 + "px") : null;
      }}
      style={{ height: counter + "%", backgroundColor: color() }}
      className={
        "  flex-1 group rounded-xl min-w-[10px] hover:ring-2d cursor-pointer hover:shadow-lg p-[1px]  "
      }
    >
      <div
        style={{
          border: `2px solid ${color()}`,
        }}
        ref={sRef}
        className={
          "pop bg-white dark:bg-layer-sec shadow-xl w-[100px] h-[65px]d hidden group-hover:block rounded-xl absolute -top-5 ring-2d font-thin  p-2 text-sm leading-none pb-2 "
        }
      >
        <p className="font-medium pb-2 text-value first-letter:uppercase  ">
          {_useLevelValues_(level)}
        </p>
        <p className="font-normal pb-[2px] ">{val}%</p>
        <p className="font-thin ">{cards?.length} cards</p>
      </div>
    </div>
  );
};
