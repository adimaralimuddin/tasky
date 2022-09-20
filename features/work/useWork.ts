import { useSelector, useDispatch } from "react-redux";
import { TopicType } from "../topic/topicType";
import {
  setTopic,
  setCategory,
  setContent,
  setOpenTopicAdder,
  setSelectedFolder,
  setFields,
  setFronts,
  setBacks,
  setTextSize,
  setImageSize,
  setViewCategory,
  setViewLevel,
  setQuizType,
  setQuizOptionNumber,
  setViewLebel,
  setSize,
} from "./workSlice";
import type { RootState } from "./../../store";
import { FieldType } from "../card/CardType";

export default function useWork() {
  const work = useSelector((state: RootState) => state.work);
  const patch = useDispatch();

  return {
    work,
    setTopic: (topic: TopicType) => patch(setTopic(topic)),
    setCategory: (cat: string) => patch(setCategory(cat)),
    setContent: (content: string) => patch(setContent(content)),
    setOpenTopicAdder: (val: boolean) => patch(setOpenTopicAdder(val)),
    setSelectedFolder: (folderId: string) => patch(setSelectedFolder(folderId)),
    setFields: (data: { fronts: FieldType[]; backs: FieldType[] }) =>
      patch(setFields(data)),
    setFronts: (fronts: FieldType[]) => patch(setFronts(fronts)),
    setBacks: (backs: FieldType[]) => patch(setBacks(backs)),
    setTextSize: (size: string) => patch(setTextSize(size)),
    setImageSize: (size: string) => patch(setImageSize(size)),
    setViewLebel: (lebel: boolean) => patch(setViewLebel(lebel)),
    setViewLevel: (level: boolean) => patch(setViewLevel(level)),
    setviewCategory: (category: boolean) => patch(setViewCategory(category)),
    setQuizType: (type: string) => patch(setQuizType(type)),
    setQuizOptionNumber: (number: number) => patch(setQuizOptionNumber(number)),
    setSize: (size: number) => patch(setSize(size)),
  };
}
