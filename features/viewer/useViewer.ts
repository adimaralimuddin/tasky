import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { CategoryType, LevelType, SideType } from "../app/appSlice";
import { viewerActions } from "./viewerSlice";

function useViewer() {
  const viewer = useSelector((s: RootState) => s.viewer);
  const patch = useDispatch();

  return {
    ...viewer,
    setTextSize: (size: string) => patch(viewerActions?.setTextSize(size)),
    setImageSize: (size: string) => patch(viewerActions?.setImageSize(size)),
    setViewLebel: (lebel: boolean) => patch(viewerActions?.setViewLebel(lebel)),
    setViewLevel: (level: boolean) => patch(viewerActions?.setViewLevel(level)),
    setviewCategory: (category: boolean) =>
      patch(viewerActions?.setViewCategory(category)),
    setQuizType: (type: string) => patch(viewerActions?.setQuizType(type)),
    setQuizOptionNumber: (number: number) =>
      patch(viewerActions?.setQuizOptionNumber(number)),
    setSize: (size: number) => patch(viewerActions?.setSize(size)),
    setSide: (side: SideType) => patch(viewerActions.setSide(side)),
    setViewCategory: (category: CategoryType) =>
      patch(viewerActions.setCategory(category)),
    setStatus: (status: LevelType) => patch(viewerActions.setStatus(status)),
  };
}

export default useViewer;
