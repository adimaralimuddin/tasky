export default function PlayNav({ setPlayInd, playInd, cards }: any) {
  return (
    <div className="flex items-center gap-2   justify-center text-slate-500 font-semibold flex-wrapd ">
      {/* <button
        className="m-0 ring-1d p-0"
        onClick={(_) => {
          setPlayInd((p: number) => (p -= 1));
        }}
      >
        prev
      </button> */}
      <p>
        {playInd + 1} / {cards?.length}
      </p>
      {/* <button
        className="m-0 ring-1d p-0"
        onClick={(_) => {
          setPlayInd((p: number) => (p += 1));
        }}
      >
        next
      </button> */}
    </div>
  );
}
