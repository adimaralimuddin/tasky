import dynamic from "next/dynamic";
import React from "react";
import useContentGetter from "../../../features/app/contents/useContentGetter";
import useClassGetter from "../../../features/class/useClassGetter";
import ClassNoClass from "../../class/ClassNoClass";
import DashboardMainContent from "../../dashboard/DashboardMainContent";
import PlayCategoryPage from "../../play/PlayCategoryPage";
import QuizMainContent from "../../quiz/QuizMainContent";
import CardAdder from "../card/cardEditor/CardAdder";
import TopicMainContent from "../topic/TopicMainContent";

const CategoryList = dynamic(() => import("../topic/category/CategoryList"), {
  ssr: false,
});

function WorkContent() {
  const { getContent, router } = useContentGetter();
  const { getClass, isLoading } = useClassGetter();
  const currentClass = getClass();
  const content = getContent();
  const classId = router.query?.classId;

  if (!currentClass && !isLoading) {
    return <ClassNoClass />;
  }

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
        <PlayCategoryPage />
      ) : content == "quiz" ? (
        <QuizMainContent />
      ) : null}
    </div>
  );
}

export default WorkContent;
