import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
import useWork from "../../../features/work/useWork";
import DashboardMainContent from "../../dashboard/DashboardMainContent";
// import CardItemLoader from "../card/cardLoader/CardItemLoader";
// import CategoryList from "../topic/category/CategoryList";
// import WorkContentLoader from "./WorkContentLoader";

const CategoryList = dynamic(() => import("../topic/category/CategoryList"), {
  ssr: false,
});
const TopicMainContent = dynamic(() => import("../topic/TopicMainContent"), {
  ssr: false,
});

function WorkContent() {
  const { work } = useWork();
  const {
    query: { classId },
  } = useRouter();
  return (
    <div>
      {work.content == "dashboard" ? (
        <DashboardMainContent />
      ) : // <WorkContentLoader />
      // ) :
      work.content == "topic" ? (
        <TopicMainContent classId={classId} />
      ) : work.content == "category" ? (
        <CategoryList classId={classId} />
      ) : // work.content == "cardadder" ? (
      //   <CardAdder classId={classId} />
      // ) : work.content == "play" ? (
      //   <PlaymainPage classId={classId} />
      // ) : work.content == "quiz" ? (
      //   <QuizMainContent classId={classId} />
      null}
    </div>
  );
}

export default WorkContent;
