import { SideIcon } from "../../lib/icons";
import Select from "../elements/Select";
import CardQueryView from "../work/card/CardQueryView";

export default function PlayHeader({ setStartSide }: any) {
  const onSelectSideHandler = (side: "fronts" | "backs") => {
    setStartSide(side);
  };
  return (
    <div className="flex_  " title="starting side">
      <Select
        className=" ring-1 ring-slate-300   dark:ring-slate-500 "
        icon={<SideIcon className="text-xl ml-1" />}
        options={[
          ["fronts", "fronts"],
          ["backs", "backs"],
        ]}
        onInput={onSelectSideHandler}
      />
      <CardQueryView />
    </div>
  );
}
