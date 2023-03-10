import dynamic from "next/dynamic";
import React from "react";
import useContentGetter from "../../../features/app/contents/useContentGetter";
import DashboardMainContent from "../../dashboard/DashboardMainContent";
import PlaymainPage from "../../play/PlaymainPage";
import QuizMainContent from "../../quiz/QuizMainContent";
import CardAdder from "../card/cardEditor/CardAdder";
import TopicMainContent from "../topic/TopicMainContent";

const CategoryList = dynamic(() => import("../topic/category/CategoryList"), {
  ssr: false,
});

function WorkContent() {
  const { getContent, router } = useContentGetter();
  const content = getContent();
  const classId = router.query?.classId;

  return (
    <div className="container flex-col flex  p-1 px-[3%] flex-1 max-w-5xl mx-auto ">
      {content == "dashboard" ? (
        <DashboardMainContent />
      ) : content == "topic" ? (
        <TopicMainContent />
      ) : content == "category" ? (
        <CategoryList />
      ) : content == "cardadder" ? (
        <CardAdder classId={classId} />
      ) : content == "play" ? (
        <PlaymainPage classId={classId} />
      ) : content == "quiz" ? (
        <QuizMainContent />
      ) : null}
    </div>
  );
}

export default WorkContent;
