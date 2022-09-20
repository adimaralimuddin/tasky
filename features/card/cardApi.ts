import request, { gql } from "graphql-request";
import { useDb } from "../../lib/db";
const url = "/api/graphql";

export async function cardApiGetCardsByTopic(topicId: string) {
  const q = gql`
    query CardsByTopic($topicId: String!) {
      cardsByTopic(topicId: $topicId) {
        id
        name
        description
        level
        category
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

  const ret = await request(url, q, { topicId });
  return ret?.cardsByTopic;
}

type Field = {
  name: string;
  type: string;
  value: any;
};

export async function fieldsSolve(fields: Field[]) {
  const client = useDb();
  return Promise.all(
    fields?.map(async (f) => {
      if (f.type === "audio" || f.type == "image") {
        if (!f?.value) return { ...f, value: "" };
        const x = await client.upload(f.value);
        return { ...f, value: x.url };
      }
      return f;
    })
  );
}

export async function cardApiCreateCard(data: {
  classId?: string;
  userId: string;
  topicId: string;
  name: string;
  description: string;
  fronts: Field[];
  backs: Field[];
}) {
  const backs = await fieldsSolve(data?.backs);
  const fronts = await fieldsSolve(data?.fronts);

  // check if free user or login user
  if (data.userId == undefined && data.classId == "cl86siwik1391dkjokty3u8na") {
    data.userId = "google-oauth2|117745479963692189418";
  }

  // remove the classId to uninclude from model
  delete data?.classId;

  const q = gql`
    mutation CreateCard(
      $userId: String!
      $topicId: String!
      $name: String!
      $description: String
      $fronts: [CommentInputType]
      $backs: [CommentInputType]
    ) {
      createCard(
        userId: $userId
        topicId: $topicId
        name: $name
        description: $description
        fronts: $fronts
        backs: $backs
      ) {
        id
        name
        description
        level
        category
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

  const ret = await request(url, q, {
    ...data,
    fronts,
    backs,
  });
  return ret.createCard;
}

export async function cardApiDeleteCard(cardId: string) {
  const q = gql`
    mutation DeleteCard($cardId: String!) {
      deleteCard(cardId: $cardId) {
        id
      }
    }
  `;
  const ret = await request(url, q, { cardId });
  return ret?.deleteCard;
}

export async function cardApiSetCardLevel({
  cardId,
  level,
}: {
  cardId: string;
  level: string;
}) {
  const q = gql`
    mutation SetCardLevel($cardId: String!, $level: String) {
      setCardLevel(cardId: $cardId, level: $level) {
        id
        level
      }
    }
  `;
  const ret = await request(url, q, { cardId, level });
  return ret.setCardLevel;
}

export async function cardApiDashboard(userId: string) {
  const q = gql`
    query NewCards($userId: String!) {
      dashboard(userId: $userId) {
        level
        category
        _count {
          id
        }
      }
    }
  `;
  const ret = await request(url, q, { userId });
  return ret.dashboard;
}
