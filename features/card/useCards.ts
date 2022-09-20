import { useQuery } from "@tanstack/react-query";
import { cardApiGetCardsByTopic } from "./cardApi";
import { CardTypes } from "./CardType";

export default function useCards(topicId: string) {
  const cards = useQuery(
    ["cards", topicId],
    async () => await cardApiGetCardsByTopic(topicId)
  );

  const category = (cat: string = "new") => {
    return cat == "all"
      ? cards?.data?.map((c, ind) => ({ ...c, ind }))
      : cards?.data
          ?.filter((c: CardTypes) => c.category == cat)
          ?.map((c, ind) => ({ ...c, ind }));
  };

  return {
    cards,
    category,
  };
}
