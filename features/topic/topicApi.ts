import request, { gql } from "graphql-request";
const url = "/api/graphql";
export default async function topicApiGetTopicsByFolder(folderId: string) {
  const q = gql`
    query TopicsByFolders($folderId: String!) {
      topicsByFolders(folderId: $folderId) {
        name
        id
        description
        templateId
        userId
        folderId
        sample
        template {
          name
          userId
          fronts
          backs
          id
        }
      }
    }
  `;

  const ret = await request(url, q, { folderId });
  return ret.topicsByFolders;
}

export async function topicApiGetTopic(topicId: string) {
  const q = gql`
    query Query($topicId: String!) {
      topic(topicId: $topicId) {
        name
        id
        description
        templateId
        userId
        folderId
        sample
      }
    }
  `;
  const ret = await request(url, q, { topicId });
  return ret.topic;
}

export async function topicApiCreateTopic(data: {
  userId: string;
  name: string;
  description: string;
  folderId: string;
  templateId: string;
}) {
  const q = gql`
    mutation CreateTopic(
      $userId: String!
      $name: String!
      $description: String!
      $folderId: String!
      $templateId: String!
    ) {
      createTopic(
        userId: $userId
        name: $name
        description: $description
        folderId: $folderId
        templateId: $templateId
      ) {
        name
        description
        id
        folderId
        userId
        templateId
        sample
        template {
          id
          name
          userId
          fronts
          backs
        }
      }
    }
  `;
  console.log("on creating topic ", { q, data });
  const ret = await request(url, q, data);
  console.log("create topic ret ", ret);
  return ret.createTopic;
}

export async function topicApiDeleteTopic({
  userId,
  topicId,
}: {
  userId: string;
  topicId: string;
}) {
  const q = gql`
    mutation Mutation($userId: String!, $topicId: String!) {
      deleteTopic(userId: $userId, topicId: $topicId) {
        name
        id
        userId
        folderId
        templateId
      }
    }
  `;
  const ret = await request(url, q, { userId, topicId });
  return ret?.deleteTopic;
}

export async function topicApiRenameTopic({
  userId,
  name,
  topicId,
}: {
  userId: string;
  name: string;
  topicId: string;
}) {
  const q = gql`
    mutation Mutation($topicId: String!, $name: String!, $userId: String!) {
      renameTopic(topicId: $topicId, name: $name, userId: $userId) {
        name
        id
        userId
      }
    }
  `;
  const ret = await request(url, q, { topicId, name, userId });
  return ret.renameTopic;
}
