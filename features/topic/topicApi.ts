import request, { gql } from "graphql-request";
export const topicUrl = "/api/graphql";
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

  const ret = await request(topicUrl, q, { folderId });
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
  const ret = await request(topicUrl, q, { topicId });
  return ret.topic;
}

// export async function topicApiCreateTopic(data: {
//   userId: string;
//   name: string;
//   description: string;
//   folderId: string;
//   templateId: string;
// }) {
//   const q = gql`
//     mutation CreateTopic(
//       $userId: String!
//       $name: String!
//       $description: String!
//       $folderId: String!
//       $templateId: String!
//     ) {
//       createTopic(
//         userId: $userId
//         name: $name
//         description: $description
//         folderId: $folderId
//         templateId: $templateId
//       ) {
//         name
//         description
//         id
//         folderId
//         userId
//         templateId
//         sample
//         template {
//           id
//           name
//           userId
//           fronts
//           backs
//         }
//       }
//     }
//   `;
//   console.log("on creating topic ", { q, data });
//   const ret = await request(topicUrl, q, data);
//   console.log("create topic ret ", ret);
//   return ret.createTopic;
// }
