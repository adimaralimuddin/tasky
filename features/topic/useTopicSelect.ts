import { useDispatch } from "react-redux";
import { setTopic } from "../work/workSlice";
import { TopicType } from "./topicType";

function useTopicSelect() {
  const patch = useDispatch();

  const selectTopic = (topic: TopicType) => {
    patch(setTopic(topic));
  };

  return {
    selectTopic,
  };
}

export default useTopicSelect;
