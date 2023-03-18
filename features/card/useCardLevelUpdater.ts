import { useUser } from "@auth0/nextjs-auth0";
import {
  MutateOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DBURL } from "../../lib/public";
import useClassGetter from "../class/useClassGetter";
import { CardTypes } from "./CardType";

function useCardLevelUpdater(topicId?: string) {
  const client = useQueryClient();
  const { user } = useUser();
  const classId = useClassGetter().getClassId();

  const cardLevelSetter = useMutation(cardApiSetCardLevel, {
    onSuccess: (updatedCard) => {
      if (topicId) {
        client.setQueryData(["cards", topicId], (cards: any) => {
          return cards?.map((card: CardTypes) => {
            if (card.id == updatedCard.id) {
              return { ...card, level: updatedCard.level };
            }
            return card;
          });
        });
      }
    },
    onError(error) {
      console.log(
        `Error:
      @useCardLevelUpdater
      msg: `,
        error
      );
    },
  });

  const setCardLevel = (
    args: SetLevelArgs,
    options?:
      | MutateOptions<any, unknown, CardLevelSetterApiType, unknown>
      | undefined
  ) => {
    const cardToBeUpdateLevelArgs: CardLevelSetterApiType = {
      ...args,
      classId,
      userId: user?.sub || undefined,
    };
    cardLevelSetter.mutate(cardToBeUpdateLevelArgs, options);
  };

  return {
    ...cardLevelSetter,
    setCardLevel,
  };
}

export async function cardApiSetCardLevel(args: CardLevelSetterApiType) {
  const q = gql`
    mutation SetCardLevel(
      $cardId: String!
      $level: String
      $userId: String
      $classId: String!
    ) {
      setCardLevel(
        cardId: $cardId
        level: $level
        classId: $classId
        userId: $userId
      ) {
        id
        level
      }
    }
  `;
  const ret = await request(DBURL, q, args);
  return ret.setCardLevel;
}

export default useCardLevelUpdater;

export type SetCardLevel = (
  args: Omit<CardLevelSetterApiType, "$classId" | "userId">,
  options?:
    | MutateOptions<any, unknown, CardLevelSetterApiType, unknown>
    | undefined
) => void;

type SetLevelArgs = {
  cardId: string;
  level: string;
};
type SetLevelApiArgs = {
  userId: string | undefined;
  classId: string;
};

type CardLevelSetterApiType = SetLevelArgs & SetLevelApiArgs;
