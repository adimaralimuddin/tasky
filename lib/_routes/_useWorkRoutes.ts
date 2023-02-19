import { useRouter } from "next/router";
import { Url } from "url";
import { TopicType } from "../../features/topic/topicType";

type NavProps = {
  topic?: TopicType | string;
  pathname?: string;
  topicId?: string;
  topicName?: string;
  content?: "topic" | "category" | "dashboard" | "cardadder" | "play" | "quiz";
  category?: "all" | "new" | "passed" | "left";
};

function _useWorkRoutes() {
  const router = useRouter();
  const { query } = router;

  const getNavQueries = ({ pathname, topic, ...otherQueries }: NavProps) => {
    const returnQueries: { query: NavProps; pathname: string } = {
      pathname: pathname || `/class/${query?.classId}`,
      query: { ...query, ...otherQueries },
    };
    if (topic) {
      returnQueries.query.topic = JSON.stringify(topic);
    }
    return returnQueries as Url;
  };

  const topic: TopicType = query?.topic
    ? JSON.parse(String(query?.topic))
    : null;

  return {
    router,
    query,
    topic,
    getNavQueries,
  };
}

export default _useWorkRoutes;
