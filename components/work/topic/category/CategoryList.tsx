import { useRouter } from "next/router";
import React from "react";
import useCards from "../../../../features/card/useCards";
import ContentHeader from "../../../elements/ContentHeader";
import CardList from "../../card/CardList";

export default function CategoryList({ classId }: any) {
  const { query } = useRouter();
  const topicId = query?.topicId;
  const selectedCategory = String(query?.category);

  const { category } = useCards(topicId);
  const cards = category(selectedCategory);

  return (
    <div className=" flex-1  flex flex-col container_   ">
      <ContentHeader />
      <CardList classId={classId} cards={cards} />
    </div>
  );
}
