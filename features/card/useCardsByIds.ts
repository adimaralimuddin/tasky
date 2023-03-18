import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../lib/public";
import { CardTypes } from "./CardType";

function useCardsByIds(ids: string[]) {
  const cardsByIds = useQuery(["cardsbyids"], () => cardsApi({ ids }));
  return {
    ...cardsByIds,
  };
}

export default useCardsByIds;

const cardsApi = async ({ ids }: { ids: string[] }): Promise<CardTypes[]> => {
  const q = gql`
    query CardsByIds($ids: [String]) {
      cardsByIds(ids: $ids) {
        backs {
          viewId
          value
          type
          text
          ind
          id
          frontId
          backId
        }
        category
        fronts {
          viewId
          value
          type
          text
          ind
          id
          frontId
          backId
        }
        id
        level
        name
        sample
        topicId
        userId
      }
    }
  `;
  const res = await request(DBURL, q, { ids });
  return res?.cardsByIds;
};
