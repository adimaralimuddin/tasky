import Select from "../elements/Select";
import CardQueryView from "../work/viewer/CardQueryView";
import PlayOptions from "./playOptions/PlayOptions";

export default function PlayHeader() {
  return (
    <div className="flex_ pt-4  ">
      <PlayOptions />
      <CardQueryView />
    </div>
  );
}
