import { useDispatch } from "react-redux";
import { setSelectedFolderId } from "../appSlice";
import useUrlState from "../useUrlState";

function useFolderSetter() {
  const patch = useDispatch();
  const { setUrlState } = useUrlState();
  const selectFolder = (folderId: string) => {
    patch(setSelectedFolderId(folderId));
    setUrlState({ folderId });
  };

  return { selectFolder };
}

export default useFolderSetter;
