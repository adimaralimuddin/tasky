import { useEffect } from "react";
export default function PlayButtons({ onFlip, onNext, side }: any) {
  return (
    <div className="flex items-center justify-center gap-2 py-2 content-center flex-wrap">
      <button
        className={
          "" +
          (side == "backs"
            ? "bg-indigo-500 text-white"
            : "bg-white dark:bg-slate-400 dark:text-white ")
        }
        onClick={onFlip}
      >
        {side == "backs" ? "hide" : "show"}
      </button>
      <button
        className="bg-teal-500 text-white"
        onClick={(_) => onNext("easy")}
      >
        remember
      </button>
      <button
        className="bg-green-500 text-white"
        onClick={(_) => onNext("normal")}
      >
        repeat
      </button>
      <button
        className="bg-pink-500 text-white"
        onClick={(_) => onNext("hard")}
      >
        forgot
      </button>
    </div>
  );
}
