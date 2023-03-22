import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import useClassGetter from "../class/useClassGetter";
import { TopicUrl } from "./topicApi";
import { TopicType } from "./topicType";
import useTopicSelecter from "./useTopicSelecter";

export default function useTopicRenamer(folderId: string) {
  const client = useQueryClient();
  const { selectTopic, isTopicSelected } = useTopicSelecter();
  const classId = useClassGetter().getClassId();

  const topicRenamer = useMutation(topicApiRenameTopic, {
    onMutate: (topicPayload) => {
      const { id, name } = topicPayload;

      if (isTopicSelected(id)) {
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
        console.log(`updated topic`, renamedTopic);

        return topics?.map((topic: TopicType) => {
          if (topic?.id == renamedTopic?.id) {
            return { ...topic, name: renamedTopic?.name };
          }
          return topic;
        });
      });
    },
    onError(err) {
      console.log(
        `Error:
      @useTopicRenamer
      msg: `,
        err
      );
    },
  });

  const renameTopic = (payload: TopicType & { classId?: string }) => {
    payload.classId = classId;
    topicRenamer.mutate(payload);
  };

  return { renameTopic };
}

export async function topicApiRenameTopic(args: TopicType) {
  console.log(`args`, args);

  const q = gql`
    mutation Mutation(
      $id: String!
      $name: String!
      $userId: String
      $classId: String!
    ) {
      renameTopic(
        topicId: $id
        name: $name
        userId: $userId
        classId: $classId
      ) {
        name
        id
        userId
      }
    }
  `;
  const ret = await request(TopicUrl, q, args);
  return ret.renameTopic;
}
