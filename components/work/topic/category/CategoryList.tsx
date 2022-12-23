import React from "react";
import useCards from "../../../../features/card/useCards";
import useWork from "../../../../features/work/useWork";
import Box from "../../../elements/Box";
import ContentHeader from "../../../elements/ContentHeader";
import NoCards from "../../../elements/NoCards";
import CardList from "../../card/CardList";

export default function CategoryList({ classId }: any) {
  const { work } = useWork();
  const { category } = useCards(work.selectedTopic?.id);

  const cards = category(work.selectedCategory);

  return (
    <Box css=" flex-1  flex flex-col ">
      <ContentHeader />
      {cards?.length > 0 ? (
        <CardList classId={classId} cards={cards} />
      ) : (
        <NoCards button={false} />
      )}
    </Box>
  );
}
