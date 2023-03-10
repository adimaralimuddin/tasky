import { LevelType } from "../../features/app/appSlice";
import { LEVEL_EASY_, LEVEL_HARD_, LEVEL_NORMAL_ } from "../public";

export default function _useLevelValues_(level: LevelType) {
  switch (level) {
    case "easy":
      return LEVEL_EASY_;
    case "normal":
      return LEVEL_NORMAL_;
    case "hard":
      return LEVEL_HARD_;
    default:
      return "";
  }
}
