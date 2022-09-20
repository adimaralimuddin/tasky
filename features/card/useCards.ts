import { useQuery } from "@tanstack/react-query";
import { cardApiGetCardsByTopic } from "./cardApi";
import { CardTypes } from "./CardType";

export default function useCards(topicId?: string | any) {
  const cards = useQuery(
    ["cards", topicId],
    async () => await cardApiGetCardsByTopic(topicId)
  );

  const category = (cat: string = "new") => {
    return cat == "all"
      ? cards?.data?.map((c: CardTypes, ind: number) => ({ ...c, ind }))
      : cards?.data
          ?.filter((c: CardTypes) => c.category == cat)
          ?.map((c: CardTypes, ind: number) => ({ ...c, ind }));
  };

  return {
    cards,
    category,
  };
}
