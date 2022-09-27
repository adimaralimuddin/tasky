import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { setContent } from "../card/cardSlice";
import {
  topicApiCreateTopic,
  topicApiDeleteTopic,
  topicApiRenameTopic,
} from "./topicApi";
import { TopicType } from "./topicType";

export default function useTopic(folderId?: string) {
  const dispatch = useDispatch();
  const client = useQueryClient();
  const topicAdder = useMutation(topicApiCreateTopic, {
    onSuccess: (createdTopic) => {
      console.log("topic added successfully ", createdTopic);
      client.setQueryData(["topics", folderId], (topics: any) => {
        return [...topics, createdTopic];
      });
    },
  });
  const topicDeleter = useMutation(topicApiDeleteTopic, {
    onSuccess: (deletedTopic) => {
      client.setQueryData(["topics", folderId], (topics: any) => {
        return topics?.filter(
          (topic: TopicType) => topic?.id !== deletedTopic?.id
        );
      });
      dispatch(setContent("dashboard"));
    },
  });

  const topicRenamer = useMutation(topicApiRenameTopic, {
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
    topicAdder,
    topicDeleter,
    topicRenamer,
    createTopic: topicAdder.mutate,
    deleteTopic: topicDeleter.mutate,
    renameTopic: topicRenamer.mutate,
  };
}
