import { useDispatch } from "react-redux";
import { setSelectedFolderId } from "../appSlice";
import useUrlState from "../useUrlState";

function useFolderSetter() {
  const patch = useDispatch();
  const { setUrlState } = useUrlState();
  const selectFolder = (folderId: string) => {
    console.log(`select folder`, folderId);

    patch(setSelectedFolderId(folderId));
    setUrlState({ folderId });
  };

  return { selectFolder };
}

export default useFolderSetter;
