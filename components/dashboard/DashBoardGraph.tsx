import React from "react";
import { LevelType } from "../../features/app/appSlice";
import { StatsType } from "../../features/app/dashboard/StatTypes";
import GraphBar from "../elements/GraphBar";

interface Props {
  statsLists: StatsType[];
}

export type SelectedGraphItem = {
  cards: string[];
  level: LevelType;
};

function DashBoardGraph({ statsLists }: Props) {
  const onItemClick = (selected: SelectedGraphItem) => {};
  return <GraphBar onItemClick={onItemClick} statsLists={statsLists} />;
}

export default DashBoardGraph;
