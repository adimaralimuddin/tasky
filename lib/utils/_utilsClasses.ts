import { LevelType } from "../../features/app/appSlice";

export const _useScoremessage = (
  score: number,
  good = "great job! you've got a good score!",
  average = "well done! you've scored average",
  bad = "to gain knowledge, you need to spend time."
) => (score > 70 ? good : score > 50 ? average : bad);

export const _useScoreColors = (
  score: number,
  good = " text-green-400 ",
  average = " text-lime-400 ",
  bad = " text-pink-400 "
) => (score > 70 ? good : score > 50 ? average : bad);

export const _useLevelColors = (
  level: LevelType,
  easy = " bg-green-100 dark:bg-green-600",
  normal = " bg-blue-100 ",
  hard = " bg-red-100 ",
  default_ = ""
) =>
  level == "easy"
    ? easy
    : level == "normal"
    ? normal
    : level == "hard"
    ? hard
    : default_;
