import {
  UseMutateFunction,
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
import {
  // cardApiCreateCard,
  // cardApiDeleteCard,
  // cardApiSetCardLevel,
} from "./cardApi";
import { CardTypes } from "./CardType";

export function useCardMutation(topicId?: string) {
  const client = useQueryClient();

  // const setCardLevel = useMutation(cardApiSetCardLevel, {
  //   onSuccess: (updatedCard) => {
  //     if (topicId) {
  //       client.setQueryData(["cards", topicId], (cards: any) => {
  //         return cards?.map((card: CardTypes) => {
  //           if (card.id == updatedCard.id) {
  //             return { ...card, level: updatedCard.level };
  //           }
  //           return card;
  //         });
  //       });
  //     }
  //   },
  // });

  return {
    // setCardLevel: setCardLevel.mutate,
  };
}

// export type SetCardLevel = UseMutateFunction<
//   any,
//   unknown,
//   {
//     cardId: string;
//     level: string;
//   },
//   unknown
// >;
