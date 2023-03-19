import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../lib/public";
import useClassGetter from "../class/useClassGetter";
import { CardTypes } from "./CardType";

function useCardDeleter(topicId?: string) {
  const client = useQueryClient();
  const classId = useClassGetter().getClassId();

  const cardDeleter = useMutation(cardApiDeleteCard, {
    onSuccess: (deletedCard) => {
      client.setQueryData(["cards", topicId], (cards: any) => {
        return cards?.filter((card: CardTypes) => card?.id !== deletedCard?.id);
      });
    },
    onError(error) {
      console.log(
        `Error:
        @useCardDeleter
        msg: `,
        error
      );
    },
  });

  const deleteCard = (args: Partial<CardDeleterApiType>) => {
    args.classId = classId;
    cardDeleter.mutate(args as Required<CardDeleterApiType>);
  };
  return {
    deleteCard,
  };
}

type CardDeleterApiType = {
  userId?: string;
  cardId: string;
  classId: String;
};
export async function cardApiDeleteCard(args: CardDeleterApiType) {
  const q = gql`
    mutation Mutation($userId: String, $classId: String!, $cardId: String!) {
      deleteCard(userId: $userId, classId: $classId, cardId: $cardId) {
        id
      }
    }
  `;
  const ret = await request(DBURL, q, args);
  return ret?.deleteCard;
}

export default useCardDeleter;
