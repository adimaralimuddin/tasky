import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { CategoryType } from "../app/appSlice";
import { CardUrl } from "./cardApi";
import { CardTypes } from "./CardType";

export default function useCards(
  topicId?: string | any,
  initialData?: CardTypes[]
) {
  const cards = useQuery(
    ["cards", topicId],
    async () => await cardApiGetCardsByTopic(topicId)
  );

  const categorizeCards = (
    cat: CategoryType = "new",
    cards_: CardTypes[] = cards?.data || []
  ) => {
    return cat == "all"
      ? cards_?.map((c: CardTypes, ind: number) => ({ ...c, ind }))
      : cards_
          ?.filter((c: CardTypes) => c.category == cat)
          ?.map((c: CardTypes, ind: number) => ({ ...c, ind }));
  };

  return {
    ...cards,
    categorizeCards,
  };
}

export async function cardApiGetCardsByTopic(
  topicId: string
): Promise<CardTypes[]> {
  const q = gql`
    query CardsByTopic($topicId: String!) {
      cardsByTopic(topicId: $topicId) {
        id
        userId
        name
        description
        level
        category
        sample
        def
        fronts {
          id
          text
          type
          value
          frontId
          backId
          ind
          viewId
        }
        backs {
          id
          text
          type
          value
          frontId
          backId
          ind
          viewId
        }
      }
    }
  `;

  const ret = await request(CardUrl, q, { topicId });

  return ret?.cardsByTopic;
}
