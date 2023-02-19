import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { topicUrl } from "./topicApi";
import { TopicType } from "./topicType";

export default function useTopicRenamer(folderId: string) {
  const client = useQueryClient();
  const topicRenamer = useMutation(topicApiRenameTopic, {
    onMutate: ({ topicId, name }) => {
      client.setQueryData(["topics", folderId], (topics: any) => {
        return topics?.map((topic: TopicType) => {
          if (topic?.id == topicId) {
            return { ...topic, name };
          }
          return topic;
        });
      });
    },
    onSuccess: (renamedTopic) => {
      client.setQueryData(["topics", folderId], (topics: any) => {
        return topics?.map((topic: TopicType) => {
          if (topic?.id == renamedTopic?.id) {
            return { ...topic, name: renamedTopic?.name };
          }
          return topic;
        });
      });
    },
  });

  const renameTopic = (payload: ApiProps) => {
    topicRenamer.mutate(payload);
  };

  return { renameTopic };
}

type ApiProps = {
  userId: string;
  name: string;
  topicId: string;
};
export async function topicApiRenameTopic({ userId, name, topicId }: ApiProps) {
  const q = gql`
    mutation Mutation($topicId: String!, $name: String!, $userId: String!) {
      renameTopic(topicId: $topicId, name: $name, userId: $userId) {
        name
        id
        userId
      }
    }
  `;
  const ret = await request(topicUrl, q, { topicId, name, userId });
  return ret.renameTopic;
}
