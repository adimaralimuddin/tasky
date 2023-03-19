import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { nanoid } from "nanoid";
import _fileReader from "../../lib/utils/_fileReader";
import useTopicGetter from "../topic/useTopicGetter";
import { CardUrl, fieldsSolve } from "./cardApi";
import { CardTypes } from "./CardType";

export default function useCardAdder() {
  const { user } = useUser();
  const topicId = useTopicGetter().getSelectedTopicId();
  const client = useQueryClient();

  const cardCreator = useMutation(cardApiCreateCard, {
    onMutate: async (cardPayload) => {
      cardPayload?.fronts?.map(async (f) => {
        if (f.value instanceof File) {
          const result = await _fileReader(f.value);
          f.value = result;
        }
        return f;
      });

      client.setQueryData(["cards", topicId], (cards: any) => {
        if (cards?.length) return [...cards, cardPayload];
        return [cardPayload];
      });
    },
    onSuccess: (createdCard) => {
      client.invalidateQueries(["cards", topicId]);
    },
    onError(x) {
      console.log(
        `Error:
      @useCardAdder
      msg: `,
        x
      );
    },
  });

  const addCard = (
    data: Omit<PayloadProps, "topicId" | "userId">,
    cb?: any
  ) => {
    if (
      data?.fronts?.[0]?.value?.trim() === "" ||
      data?.backs?.[0]?.value?.trim() === ""
    ) {
      console.log(`Validate:
      @useCardAdder/addCard
      msg: card's fields are empty`);
      return;
    }

    const totalCards: CardTypes[] | undefined = client.getQueryData([
      "cards",
      topicId,
    ]);

    if ((totalCards?.length || 0) >= 20) {
      alert(`you are only allowed to create over 20 cards.
      i'm limiting because i use free resources for this projects.`);
      return;
    }
    const finalCardData = {
      id: nanoid(),
      topicId,
      userId: user?.sub || undefined,
      ...data,
    };

    cardCreator.mutate(finalCardData);
    cb?.(finalCardData);
  };

  return {
    ...cardCreator,
    addCard,
  };
}

type Field = {
  id: string;
  name: string;
  type: string;
  value: any;
};
interface PayloadProps {
  id?: string;
  classId: string;
  userId: string | undefined;
  topicId: string;
  name: string;
  description: string;
  fronts: Field[];
  backs: Field[];
}
export async function cardApiCreateCard(data: PayloadProps) {
  const backs = await fieldsSolve(data?.backs);
  const fronts = await fieldsSolve(data?.fronts);

  // check if free user or login user
  if (data.userId == undefined && data.classId == "cl86siwik1391dkjokty3u8na") {
    data.userId = "google-oauth2|117745479963692189418";
  }

  const q = gql`
    mutation addCardMutation(
      $id: String!
      $ind: Int!
      $classId: String!
      $userId: String
      $topicId: String!
      $name: String!
      $description: String
      $fronts: [CommentInputType]
      $backs: [CommentInputType]
    ) {
      addCard(
        id: $id
        ind: $ind
        classId: $classId
        userId: $userId
        topicId: $topicId
        name: $name
        description: $description
        fronts: $fronts
        backs: $backs
      ) {
        id
        ind
        classId
        userId
        name
        description
        level
        category
        def
        sample
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

  const ret = await request(CardUrl, q, {
    ...data,
    fronts,
    backs,
  });
  return ret.createCard;
}
