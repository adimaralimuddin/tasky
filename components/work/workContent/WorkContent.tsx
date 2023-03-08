import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import useContentGetter from "../../../features/app/contents/useContentGetter";
import DashboardMainContent from "../../dashboard/DashboardMainContent";
import PlaymainPage from "../../play/PlaymainPage";
import QuizMainContent from "../../quiz/QuizMainContent";
import CardAdder from "../card/cardEditor/CardAdder";
import TopicMainContent from "../topic/TopicMainContent";

const CategoryList = dynamic(() => import("../topic/category/CategoryList"), {
  ssr: false,
});

function WorkContent({ serverState }: any) {
  const { getContent, router } = useContentGetter();
  const [s, ss] = useState(getContent());
  const content = getContent();
  const classId = router.query?.classId;

  useEffect(() => {
    console.log(`content`, content);
  }, []);

  // console.log(`work content here`);

  return (
    <div className="container flex-col flex  p-1 px-[3%] flex-1 max-w-5xl mx-auto ">
      {content == "dashboard" ? (
        <DashboardMainContent serverState={serverState} />
      ) : content == "topic" ? (
        <TopicMainContent />
      ) : content == "category" ? (
        <CategoryList />
      ) : content == "cardadder" ? (
        <CardAdder classId={classId} />
      ) : content == "play" ? (
        <PlaymainPage classId={classId} />
      ) : content == "quiz" ? (
        <QuizMainContent classId={classId} />
      ) : null}
    </div>
  );
}

export default WorkContent;
