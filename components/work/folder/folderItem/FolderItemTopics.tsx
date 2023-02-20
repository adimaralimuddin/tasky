import React from "react";
import { TopicType } from "../../../../features/topic/topicType";
import useTopics from "../../../../features/topic/useTopics";
import TopicItem from "../../topic/topicItem/TopicItem";

interface Props {
  id: string;
  setSelected: any;
  topics: any;
}
function FolderItemTopics({ setSelected, id, topics: preTopic }: Props) {
  const { topics: nextTopic } = useTopics(id);
  const topics = preTopic;

  console.log(`final topic`, preTopic);

  return (
    <div className="ml-3 border-l-2 py-1 px-2 ">
      {topics?.map((topic: TopicType) => (
        <TopicItem data={topic} key={topic.id} selectFolder={setSelected} />
      ))}
    </div>
  );
}

export default FolderItemTopics;
