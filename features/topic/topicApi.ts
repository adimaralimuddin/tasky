import request, { gql } from "graphql-request";
export const TopicUrl = "/api/graphql";

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
  const ret = await request(TopicUrl, q, { topicId });
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
//   const ret = await request(topicUrl, q, data);
//   return ret.createTopic;
// }
