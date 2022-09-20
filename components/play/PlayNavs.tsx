export default function PlayNav({ playInd, cards }: any) {
  return (
    <div className="flex items-center gap-2   justify-center text-slate-500 font-semibold flex-wrapd ">
      <p>
        {playInd + 1} / {cards?.length}
      </p>
    </div>
  );
}
