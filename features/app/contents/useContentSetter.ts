import { useDispatch } from "react-redux";
import { CategoryType, ContentType, setContCat, setContent } from "../appSlice";
import useUrlState from "../useUrlState";

function useContentSetter() {
  const patch = useDispatch();
  const { setUrlState } = useUrlState();

  const setContent_ = (content: ContentType, category?: CategoryType) => {
    localStorage.setItem("content", content);
    const states_ = { content, category };
    if (!category) {
      delete states_?.category;
    }
    patch(setContCat(states_));
    setUrlState(states_);
  };

  return { setContent: setContent_ };
}

export default useContentSetter;
