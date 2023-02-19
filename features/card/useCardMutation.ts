import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  // cardApiCreateCard,
  cardApiDeleteCard,
  cardApiSetCardLevel,
} from "./cardApi";
import { CardTypes } from "./CardType";

export function useCardMutation(topicId?: string) {
  const client = useQueryClient();

  // const cardCreator = useMutation(cardApiCreateCard, {
  //   onSuccess: (createdCard) => {
  //     client.setQueryData(["cards", topicId], (cards: any) => {
  //       return [...cards, createdCard];
  //     });
  //   },
  // });

  const cardDeleter = useMutation(cardApiDeleteCard, {
    onSuccess: (deletedCard) => {
      client.setQueryData(["cards", topicId], (cards: any) => {
        return cards?.filter((card: CardTypes) => card?.id !== deletedCard?.id);
      });
    },
  });

  const setCardLevel = useMutation(cardApiSetCardLevel, {
    onSuccess: (updatedCard) => {
      client.setQueryData(["cards", topicId], (cards: any) => {
        return cards?.map((card: CardTypes) => {
          if (card.id == updatedCard.id) {
            return { ...card, level: updatedCard.level };
          }
          return card;
        });
      });
    },
  });

  return {
    // cardCreator,
    cardDeleter,
    // createCard: cardCreator.mutate,
    deleteCard: cardDeleter.mutate,
    setCardLevel: setCardLevel.mutate,
  };
}
