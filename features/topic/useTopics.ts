import { useQuery } from "@tanstack/react-query";
import topicApiGetTopicsByFolder from "./topicApi";

export default function useTopics(folderId: string) {
  const topics = useQuery(
    ["topics", folderId],
    async () => await topicApiGetTopicsByFolder(folderId)
  );

  return {
    topics,
  };
}
