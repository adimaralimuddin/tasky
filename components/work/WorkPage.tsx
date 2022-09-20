import { useRouter } from "next/router";
import React from "react";
import useWork from "../../features/work/useWork";
import DashboardMainContent from "../dashboard/DashboardMainContent";
import LayoutMainHeader from "../layouts/LayoutMainHeader";
import PlaymainPage from "../play/PlaymainPage";
import QuizMainContent from "../quiz/QuizMainContent";
import CardAdder from "./card/CardAdder";
import CategoryList from "./topic/category/CategoryList";
import TopicMainContent from "./topic/TopicMainContent";
import WorkSide from "./WorkSide/WorkSideMain";

export default function WorkPage() {
  const {
    query: { classId },
  } = useRouter();

  const { work } = useWork();

  return (
    <div className=" min-h-[100vh] flexd flex-col flex  ">
      <LayoutMainHeader />
      <div className="flex max-w-5xl mx-auto w-full p-2  flex-1">
        <WorkSide classId={classId} />
        <div className="flex-[3] flex flex-col">
          {work.content == "dashboard" ? (
            <DashboardMainContent />
          ) : work.content == "topic" ? (
            <TopicMainContent classId={classId} />
          ) : work.content == "category" ? (
            <CategoryList classId={classId} />
          ) : work.content == "cardadder" ? (
            <CardAdder classId={classId} />
          ) : work.content == "play" ? (
            <PlaymainPage classId={classId} />
          ) : work.content == "quiz" ? (
            <QuizMainContent classId={classId} />
          ) : null}
        </div>
      </div>
    </div>
  );
}
