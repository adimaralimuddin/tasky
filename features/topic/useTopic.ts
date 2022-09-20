import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  topicApiCreateTopic,
  topicApiDeleteTopic,
  topicApiRenameTopic,
} from "./topicApi";
import { TopicType } from "./topicType";

export default function useTopic(folderId?: string) {
  const client = useQueryClient();
  const createTopicMutation = useMutation(topicApiCreateTopic, {
    onSuccess: (createdTopic) => {
      client.setQueryData(["topics", folderId], (topics: any) => {
        return [...topics, createdTopic];
      });
    },
  });
  const deleteTopic = useMutation(topicApiDeleteTopic, {
    onSuccess: (deletedTopic) => {
      client.setQueryData(["topics", folderId], (topics: any) => {
        return topics?.filter(
          (topic: TopicType) => topic?.id !== deletedTopic?.id
        );
      });
    },
  });

  const renameTopic = useMutation(topicApiRenameTopic, {
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

  return {
    createTopic: createTopicMutation.mutate,
    deleteTopic: deleteTopic.mutate,
    renameTopic: renameTopic.mutate,
  };
}