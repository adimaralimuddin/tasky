import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { CardUrl } from "./cardApi";
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
    ...cards,
    category,
  };
}

export async function cardApiGetCardsByTopic(topicId: string) {
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
        }
        backs {
          id
          text
          type
          value
          frontId
          backId
          ind
        }
      }
    }
  `;

  const ret = await request(CardUrl, q, { topicId });
  return ret?.cardsByTopic;
}
