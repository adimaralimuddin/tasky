import { useSelector } from "react-redux";
import { RootState } from "../../store";

function useFolderGetter() {
  const selectedFolderId = useSelector(
    (s: RootState) => s.app.selectedFolderId
  );
  return { selectedFolderId };
}

export default useFolderGetter;
