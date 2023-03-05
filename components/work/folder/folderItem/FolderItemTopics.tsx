import React from "react";
import { TopicType } from "../../../../features/topic/topicType";
import useTopics from "../../../../features/topic/useTopics";
import TopicItem from "../../topic/topicItem/TopicItem";

interface Props {
  id: string;
  setSelected: any;
  serverTopic: TopicType[] | undefined;
}
function FolderItemTopics({ setSelected, id, serverTopic }: Props) {
  const { data: nextTopic } = useTopics(id);
  const topics = nextTopic;

  return (
    <div className="ml-3 border-l-2 dark:border-layer-100 px-2 flex-1">
      {topics?.map((topic: TopicType) => (
        <TopicItem
          data={topic}
          serverData={serverTopic?.find((t) => t?.id === topic.id) as any} // adimar
          key={topic.id}
          selectFolder={setSelected}
        />
      ))}
    </div>
  );
}

export default FolderItemTopics;
