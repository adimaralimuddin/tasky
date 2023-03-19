import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { TopicUrl } from "./topicApi";
import { TopicType } from "./topicType";

export default function useTopics(folderId: string, initialData?: TopicType[]) {
  const topics = useQuery(
    ["topics", folderId],
    async () => {
      const res = await topicApiGetTopicsByFolder(folderId);
      return res;
    },
    { initialData }
  );

  return {
    ...topics,
  };
}

async function topicApiGetTopicsByFolder(folderId: string) {
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

  const ret = await request(TopicUrl, q, { folderId });

  return ret.topicsByFolders;
}
