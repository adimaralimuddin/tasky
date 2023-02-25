import React from "react";
import useCategoryGetter from "../../../../features/app/category/useCategoryGetter";
import useFieldsGetter from "../../../../features/app/fields/useFieldsGetter";
import useCards from "../../../../features/card/useCards";
import useTopicGetter from "../../../../features/topic/useTopicGetter";
import BtnBack from "../../../elements/BtnBack";
import ContentHeader from "../../../elements/ContentHeader";
import TopicTitle from "../../../elements/TopicTitle";
import CardList from "../../card/CardList";

export default function CategoryList() {
  const { getSelectedCategory } = useCategoryGetter();
  const { getSelectedTopicId } = useTopicGetter();
  const f = useFieldsGetter().getFields();

  const selectedCategory = getSelectedCategory();

  const topicId = getSelectedTopicId();
  const { categorizeCards } = useCards(topicId);
  const cards = categorizeCards(selectedCategory);

  return (
    <div className=" flex-1  flex flex-col container_   ">
      <ContentHeader />
      <CardList cards={cards} />
    </div>
  );
}
