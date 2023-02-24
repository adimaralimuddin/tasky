import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
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
  };
}

export default useViewer;
