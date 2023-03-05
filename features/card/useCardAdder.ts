import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { nanoid } from "nanoid";
import _fileReader from "../../lib/utils/_fileReader";
import useTopicGetter from "../topic/useTopicGetter";
import { CardUrl, fieldsSolve } from "./cardApi";

export default function useCardAdder() {
  const { user } = useUser();
  const topicId = useTopicGetter().getSelectedTopicId();
  const client = useQueryClient();

  const cardCreator = useMutation(cardApiCreateCard, {
    onMutate: async (cardPayload) => {
      console.log(`card payload`, cardPayload);

      // cardPayload.fronts = await Promise.all(
      cardPayload?.fronts?.map(async (f) => {
        if (f.value instanceof File) {
          // console.log(`yes a file`);
          const result = await _fileReader(f.value);
          f.value = result;
          // console.log(`here is the result `, f);
        }
        return f;
      });
      // );

      client.setQueryData(["cards", topicId], (cards: any) => {
        if (cards?.length) return [...cards, cardPayload];
        return [cardPayload];
      });
    },
    onSuccess: (createdCard) => {
      console.log("usecards: added", createdCard);
      client.invalidateQueries(["cards", topicId]);
      // client.setQueryData(["cards", topicId], (cards: any) => {
      //   return [...cards, createdCard];
      // });
    },
    onError(x) {
      console.log(`error`, x);
    },
  });

  const addCard = (
    data: Omit<PayloadProps, "topicId" | "userId">,
    cb?: any
  ) => {
    cardCreator.mutate({
      id: nanoid(),
      topicId,
      userId: user?.sub || undefined,
      ...data,
    });
    cb?.(data);
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
  classId?: string;
  userId: string | undefined;
  topicId: string;
  name: string;
  description: string;
  fronts: Field[];
  backs: Field[];
}
export async function cardApiCreateCard(data: PayloadProps) {
  console.log("about to create card", data);
  const backs = await fieldsSolve(data?.backs);
  const fronts = await fieldsSolve(data?.fronts);

  console.log(`fields resolved`, { fronts, backs });

  // check if free user or login user
  if (data.userId == undefined && data.classId == "cl86siwik1391dkjokty3u8na") {
    data.userId = "google-oauth2|117745479963692189418";
  }

  // remove the classId to un include from model
  delete data?.classId;

  const q = gql`
    mutation CreateCard(
      $id: String!
      $userId: String!
      $topicId: String!
      $name: String!
      $description: String
      $fronts: [CommentInputType]
      $backs: [CommentInputType]
    ) {
      createCard(
        id: $id
        userId: $userId
        topicId: $topicId
        name: $name
        description: $description
        fronts: $fronts
        backs: $backs
      ) {
        id
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
