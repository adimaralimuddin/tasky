import React, { useRef } from "react";
import _useGraphCount from "../../lib/utils/_useGraphCount";

const initData = [
  {
    a: 23,
    b: 74,
    day: Date.now(),
  },
  {
    a: 83,
    b: 74,
    day: Date.now(),
  },
  {
    a: 43,
    b: 24,
    day: Date.now(),
  },
  {
    a: 63,
    b: 14,
    day: Date.now(),
  },
  {
    a: 43,
    b: 74,
    day: Date.now(),
  },
  {
    a: 53,
    b: 74,
    day: Date.now(),
  },
  {
    a: 53,
    b: 74,
    day: Date.now(),
  },
];

const percentage = [100, 80, 60, 40, 20, 0];

function GraphBar() {
  return (
    <div className=" flex-1 pt-3 bg-slate-200d flex flex-col max-h-[200pxd]">
      <header className="flex pb-2 pl-[15%]">
        <p className="text-[#7756AC] dark:text-[#ae8be7]  px-2">remembered</p>
        <p className="text-[#F37C7C] dark:text-[#eaa1a1] px-2">forgotten</p>
      </header>
      <div className="flex flex-1 gap-6 max-h-[200px] dark:opacity-70">
        <div className="bg-red-200d hidden sm:flex flex-col text-sm justify-around">
          {percentage.map((p) => (
            <small className="text-slate-400" key={p}>
              {p}%
            </small>
          ))}
        </div>
        <div className="flex-1 flex gap-[5%] min-w-[180px] justify-start  overflow-y-hidden overflow-x-auto min-h-[150px] ">
          {initData.map((data, i) => (
            <div className=" flex flex-col " key={i}>
              <div className="flex flex-1 gap-1  items-end max-w-[35px]">
                <Bar val={data.a} side="a" />
                <Bar val={data.b} side="b" />
              </div>
              <small className="text-[.7rem] font-normal text-slate-400">
                monday
              </small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default GraphBar;

const Bar = ({ val, side }: { val: number; side: "a" | "b" }) => {
  const { counter } = _useGraphCount(val, 2);
  const sRef = useRef<HTMLDivElement>(null);

  const color = (a = "#7756AC", b = "#F37C7C") => (side === "a" ? a : b);

  return (
    <div
      onMouseMove={(e) => {
        sRef?.current ? (sRef.current.style.left = e.pageX + 10 + "px") : null;
        sRef?.current ? (sRef.current.style.top = e.pageY - 50 + "px") : null;
      }}
      style={{ height: counter + "%", backgroundColor: color() }}
      className={
        "  flex-1 group rounded-xl hover:ring-2d cursor-pointer hover:shadow-lg p-[1px]  "
      }
    >
      {/* <div className="bg-white shadow-md p-2 rounded-xl relatived"> */}
      <div
        style={{
          border: `2px solid ${color()}`,
        }}
        ref={sRef}
        className={
          "pop bg-white dark:bg-layer-sec shadow-xl w-[100px] h-[65px] hidden group-hover:block rounded-xl absolute -top-5 ring-2d font-thin  p-2 text-sm leading-none "
        }
      >
        <p className="font-normal pb-[2px] ">{val}%</p>
        <p className="font-thin pb-[2px] ">monday</p>
        <p className="font-thin pb-[2px]">12 cards</p>
      </div>
      {/* </div> */}
    </div>
  );
};
