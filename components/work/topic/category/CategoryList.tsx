import React from "react";
import useCategoryGetter from "../../../../features/app/category/useCategoryGetter";
import useCards from "../../../../features/card/useCards";
import useTopicGetter from "../../../../features/topic/useTopicGetter";
import ContentHeader from "../../../elements/ContentHeader";
import CardListWithQuery from "../../card/cardLists/CardListWithQuery";

export default function CategoryList() {
  const { getSelectedCategory } = useCategoryGetter();
  const { getSelectedTopicId } = useTopicGetter();

  const selectedCategory = getSelectedCategory();

  const topicId = getSelectedTopicId();
  const { categorizeCards } = useCards(topicId);
  const cards = categorizeCards(selectedCategory);

  return (
    <div className=" flex-1  flex flex-col container_ animate-fadein   ">
      <ContentHeader />
      <CardListWithQuery cards={cards} />
    </div>
  );
}
