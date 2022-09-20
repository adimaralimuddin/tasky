import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  topicApiCreateTopic,
  topicApiDeleteTopic,
  topicApiRenameTopic,
} from "./topicApi";

export default function useTopic(folderId: string) {
  const client = useQueryClient();
  const createTopicMutation = useMutation(topicApiCreateTopic, {
    onSuccess: (createdTopic) => {
      client.setQueryData(["topics", folderId], (topics) => {
        return [...topics, createdTopic];
      });
    },
  });
  const deleteTopic = useMutation(topicApiDeleteTopic, {
    onSuccess: (deletedTopic) => {
      console.log("deleted topic ", deletedTopic);
      client.setQueryData(["topics", folderId], (topics) => {
        console.log("topics ", topics);
        return topics?.filter((topic) => topic?.id !== deletedTopic?.id);
      });
    },
  });

  const renameTopic = useMutation(topicApiRenameTopic, {
    onSuccess: (renamedTopic) => {
      client.setQueryData(["topics", folderId], (topics) => {
        console.log("folder id ", folderId);
        console.log("renamed ", renamedTopic);
        console.log("topics ", topics);
        return topics?.map((topic) => {
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
