import React, { useState } from "react";
import { CardTypes } from "../../../features/card/CardType";
import useCardLevelUpdater from "../../../features/card/useCardLevelUpdater";
import PlaymainPage from "../PlaymainPage";

interface Props {
  cards: CardTypes[];
  setPlaying: any;
}
function PlayDashboardCardsPage({ cards: cards_, setPlaying }: Props) {
  const { setCardLevel } = useCardLevelUpdater();

  const [cards, setCards] = useState(cards_);
  return (
    <div className="flex-1 col_ gap-0 max-h-[75vh] sm:max-h-[80vh] overflow-y-auto px-6 pl-10">
      <PlaymainPage
        hideHeader={true}
        cards={cards}
        setCards={setCards}
        setCardLevel={setCardLevel}
        isCardEditable={false}
        showAllFields={true}
      />
    </div>
  );
}

export default PlayDashboardCardsPage;
