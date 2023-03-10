import { LevelType } from "../../features/app/appSlice";
import { LEVEL_EASY, LEVEL_HARD, LEVEL_NORMAL } from "../public";

export default function _useLevelValues(level: LevelType) {
  switch (level) {
    case "easy":
      return LEVEL_EASY;
    case "normal":
      return LEVEL_NORMAL;
    case "hard":
      return LEVEL_HARD;
    default:
      return "";
  }
}
