import React from "react";
import useCategorySelecter from "../../../features/app/category/useCategorySelecter";
import useContentSetter from "../../../features/app/contents/useContentSetter";
import useTopicGetter from "../../../features/topic/useTopicGetter";
import BtnCardAdder from "../../elements/BtnCardAdder";
import ContentHeader from "../../elements/ContentHeader";
import CategoryItem from "./category/CategoryItem";

export default function TopicMainContent() {
  const { setContent } = useContentSetter();
  const { selectCategory } = useCategorySelecter();
  const topicId = useTopicGetter().getSelectedTopicId();

  return (
    <div className="flex-1 flex flex-col container_ py-2 animate-fadein ">
      <ContentHeader
        removeMiddlePaths={true}
        Action={""}
        extraPath="overview"
      />
      <header className="flex gap-6 items-center justify-between  pt-4 max-w-4xl">
        <section className="flex_">
          <button
            className="btn-prime max-w-[200px]"
            onClick={() => {
              selectCategory("all");
              setContent("play");
            }}
          >
            Play All
          </button>
          <button
            className="btn-sec"
            onClick={() => {
              selectCategory("all");
              setContent("quiz");
            }}
          >
            Quiz All
          </button>
        </section>
        <BtnCardAdder />
      </header>
      <main className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-3 max-w-4xl ">
        <CategoryItem topicId={topicId} category="all" />
        <CategoryItem topicId={topicId} category="new" />
        <CategoryItem topicId={topicId} category="passed" text="completed" />
        <CategoryItem topicId={topicId} category="left" text="remaining" />
      </main>
    </div>
  );
}
