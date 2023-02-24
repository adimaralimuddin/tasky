import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { TopicUrl } from "./topicApi";
import { TopicType } from "./topicType";
import useTopicSelecter from "./useTopicSelecter";

export default function useTopicRenamer(folderId: string) {
  const client = useQueryClient();
  const { selectTopic, isTopicSelected } = useTopicSelecter();

  const topicRenamer = useMutation(topicApiRenameTopic, {
    onMutate: (topicPayload) => {
      const { id, name } = topicPayload;

      if (isTopicSelected(id)) {
        console.log(`yes, this topic is currently selected`, topicPayload);
        selectTopic(topicPayload);
      }

      client.setQueryData(["topics", folderId], (topics: any) => {
        if (!topics) {
          return [{ ...topicPayload }];
        }
        const updatedTopics = topics?.map((topic: TopicType) => {
          if (topic?.id == id) {
            return { ...topic, name };
          }
          return topic;
        });

        return updatedTopics;
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

  const renameTopic = (payload: TopicType) => {
    topicRenamer.mutate(payload);
  };

  return { renameTopic };
}

export async function topicApiRenameTopic({ userId, name, id }: TopicType) {
  const q = gql`
    mutation Mutation($id: String!, $name: String!, $userId: String!) {
      renameTopic(topicId: $id, name: $name, userId: $userId) {
        name
        id
        userId
      }
    }
  `;
  const ret = await request(TopicUrl, q, { id, name, userId });
  return ret.renameTopic;
}
