export default function PlayButtons({ onFlip, onNext, side }: any) {
  return (
    <div className="flex items-center justify-center gap-2 py-2 content-center flex-wrap">
      <button
        className={
          "" +
          (side == "backs"
            ? "bg-indigo-400 text-white"
            : "bg-white dark:bg-slate-400 dark:text-white ")
        }
        onClick={onFlip}
      >
        {side == "backs" ? "hide" : "show"}
      </button>
      <button
        className="bg-teal-400 text-white"
        onClick={(_) => onNext("easy")}
      >
        easy
      </button>
      <button
        className="bg-green-400 text-white"
        onClick={(_) => onNext("normal")}
      >
        normal
      </button>
      <button className="bg-red-400 text-white" onClick={(_) => onNext("hard")}>
        hard
      </button>
    </div>
  );
}
