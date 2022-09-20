import { useQuery } from "@tanstack/react-query";
import { topicApiGetTopic } from "./topicApi";

export default function useTopicId(topicId: string) {
  const { data: topic } = useQuery(["topic", topicId], () =>
    topicApiGetTopic(topicId)
  );

  return { topic };
}
