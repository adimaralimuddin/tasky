import useWork from "../../features/work/useWork";
import { SideIcon } from "../../lib/icons";
import CardQueryView from "../work/card/CardQueryView";

export default function PlayHeader({ startSide, setStartSide }: any) {
  const {
    work: { selectedCategory, selectedTopic },
  } = useWork();
  return (
    <div className="flex items-center bg-white dark:bg-slate-700 px-2 w-full max-w-xl rounded-xl mx-auto flex-wrap">
      <div
        title="start side"
        className="p-0 px-2 m-0 flex items-center gap-2 ring-1 rounded-lg ring-slate-300 mx-1 cursor-pointer hover:shadow-lg"
      >
        <SideIcon className="text-xl" />
        <select
          className="ring-1d ring-slate-200 bg-slate-100d m-0 p-0 "
          onInput={(e: any) => setStartSide(e.target.value)}
          name=""
          id=""
          defaultValue={startSide}
        >
          <option value="fronts">fronts</option>
          <option value="backs">backs</option>
        </select>
      </div>
      <CardQueryView />
    </div>
  );
}
