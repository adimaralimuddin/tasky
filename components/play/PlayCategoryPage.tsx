import React, { useState } from "react";
import useCategoryGetter from "../../features/app/category/useCategoryGetter";
import useCardLevelUpdater from "../../features/card/useCardLevelUpdater";
import useCards from "../../features/card/useCards";
import useTopicGetter from "../../features/topic/useTopicGetter";
import PlaymainPage from "./PlaymainPage";

function PlayCategoryPage() {
  const topic = useTopicGetter().getSelectedTopic();
  const { categorizeCards } = useCards(topic?.id);
  const { setCardLevel } = useCardLevelUpdater(topic?.id);

  const selectedCategory = useCategoryGetter().getSelectedCategory();
  const cards_ = categorizeCards(selectedCategory);
  const [cards, setCards] = useState(cards_);
  return (
    <PlaymainPage
      cards={cards}
      setCards={setCards}
      setCardLevel={setCardLevel}
    />
  );
}

export default PlayCategoryPage;
