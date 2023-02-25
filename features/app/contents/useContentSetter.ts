import { useDispatch } from "react-redux";
import { ContentType, setContent } from "../appSlice";
import useUrlState from "../useUrlState";

function useContentSetter() {
  const patch = useDispatch();
  const { setUrlState } = useUrlState();

  const setContent_ = (content: ContentType) => {
    patch(setContent(content));
    setUrlState({ content });
  };
  return { setContent: setContent_ };
}

export default useContentSetter;
