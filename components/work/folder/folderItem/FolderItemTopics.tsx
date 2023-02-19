import React from "react";
import { TopicType } from "../../../../features/topic/topicType";
import useTopics from "../../../../features/topic/useTopics";
import TopicItem from "../../topic/topicItem/TopicItem";

interface Props {
  id: string;
  setSelected: any;
  setSideBar: any;
}
function FolderItemTopics({ setSelected, id, setSideBar }: Props) {
  const { topics } = useTopics(id);
  return (
    <div className="ml-3 border-l-2 py-1 px-2 ">
      {topics?.data?.map((topic: TopicType) => (
        <TopicItem
          data={topic}
          key={topic.id}
          selectFolder={setSelected}
          setSideBar={setSideBar}
        />
      ))}
    </div>
  );
}

export default FolderItemTopics;
