import React from "react";
import { TopicType } from "../../../../features/topic/topicType";
import useTopics from "../../../../features/topic/useTopics";
import Collapsable from "../../../elements/Collapsable";
import TopicItem from "../../topic/topicItem/TopicItem";

interface Props {
  id: string;
  setSelected: any;
  open: boolean;
}
function FolderItemTopics({ setSelected, id, open }: Props) {
  const { data: nextTopic } = useTopics(id);
  const topics = nextTopic;

  return (
    <div
      className={
        "ml-3 animate-pop border-l-2 px-2 dark:border-layer-100 flex-1 pt-1d "
      }
    >
      <Collapsable
        open={open}
        className={" col_ gap-[2px] px-2 " + (open && " pt-1 ")}
      >
        {topics?.map((topic: TopicType) => (
          <TopicItem key={topic.id} data={topic} selectFolder={setSelected} />
        ))}
      </Collapsable>
    </div>
  );
}

export default FolderItemTopics;
