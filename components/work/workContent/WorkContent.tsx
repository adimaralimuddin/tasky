import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import DashboardMainContent from "../../dashboard/DashboardMainContent";
// import PlaymainPage from "../../play/PlaymainPage";
// import QuizMainContent from "../../quiz/QuizMainContent";

// const CardAdder = dynamic(() => import("../card/cardEditor/CardAdder"), {
//   ssr: false,
// });
const CategoryList = dynamic(() => import("../topic/category/CategoryList"), {
  ssr: false,
});
const TopicMainContent = dynamic(() => import("../topic/TopicMainContent"), {
  ssr: false,
});

function WorkContent() {
  const router = useRouter();

  const content = router.query?.content || "dashboard";
  const classId = router.query?.classId;
  return (
    <div>
      {content == "dashboard" ? (
        <DashboardMainContent />
      ) : content == "topic" ? (
        <TopicMainContent classId={classId} />
      ) : content == "category" ? (
        <CategoryList classId={classId} />
      ) : content == "cardadder" ? (
        "card adder"
      ) : // <CardAdder classId={classId} />
      content == "play" ? (
        "play" // <PlaymainPage classId={classId} />
      ) : content == "quiz" ? (
        "quiz" //<QuizMainContent classId={classId} />
      ) : null}
    </div>
  );
}

export default WorkContent;
