import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

function useTopicGetter() {
  const router = useRouter();
  const selectedTopic = useSelector((s: RootState) => s.app.selectedTopic);

  const getSelectedTopicId = () => {
    return selectedTopic?.id || String(router.query?.topicId);
  };

  const getSelectedTopic = () => {
    return (
      selectedTopic ||
      (router.query?.topic && JSON.parse(String(router.query?.topic)))
    );
  };

  return { getSelectedTopicId, getSelectedTopic };
}

export default useTopicGetter;
