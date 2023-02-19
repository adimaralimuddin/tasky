import React from "react";
import _useWorkRoutes from "../../../lib/_routes/_useWorkRoutes";
import BtnCardAdder from "../../elements/BtnCardAdder";
import BtnPrime from "../../elements/BtnPrime";
import BtnSec from "../../elements/BtnSec";
import ContentHeader from "../../elements/ContentHeader";
import CategoryItem from "./category/CategoryItem";

export default function TopicMainContent({ classId }: any) {
  const { getNavQueries, query } = _useWorkRoutes();

  const topicId = String(query?.topicId);

  const onSelectCategory = (field: "all" | "new" | "passed" | "left") => {
    return getNavQueries({
      category: field,
      content: "category",
    });
  };

  return (
    <div className="flex-1 flex flex-col container_">
      <ContentHeader Action={BtnCardAdder} />
      <div className="ring-1d flex-1 flex flex-col justify-center ">
        <main className="grid grid-cols-2 px-6 gap-5 flex-wrap  items-center justify-evenly ">
          <CategoryItem
            topicId={topicId}
            onSelect={onSelectCategory}
            field="all"
          />
          <CategoryItem
            topicId={topicId}
            onSelect={onSelectCategory}
            field="new"
          />
          <CategoryItem
            topicId={topicId}
            onSelect={onSelectCategory}
            field="passed"
          />
          <CategoryItem
            topicId={topicId}
            onSelect={onSelectCategory}
            field="left"
          />
        </main>
        <div className="py-5 flex items-center justify-center ">
          {/* <BtnPrime onClick={() => setContent("play")}>play</BtnPrime> */}
          {/* <BtnSec onClick={() => setContent("quiz")}>quiz</BtnSec> */}
        </div>
      </div>
    </div>
  );
}
