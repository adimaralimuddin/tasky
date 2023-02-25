import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  CategoryType,
  ContentType,
  selectTopic,
  templateFields,
} from "../app/appSlice";
import useUrlState from "../app/useUrlState";
import { TopicType } from "./topicType";

function useTopicSelecter() {
  const patch = useDispatch();
  const { query, setUrlState } = useUrlState();
  const selectedTopic = useSelector((s: RootState) => s.app?.selectedTopic);

  const isTopicSelected = (
    topicId: string,
    true_: boolean | string = true,
    false_: boolean | string = false
  ) => {
    return selectedTopic?.id === topicId || query?.topicId == topicId
      ? true_
      : false_;
  };

  const selectTopic_ = (
    topicData: TopicType,
    content: ContentType = "topic",
    category: CategoryType = "all"
  ) => {
    patch(selectTopic({ topic: topicData, content, category }));
    // const fronts = topicData?.template?.fronts as string;

    const fields = templateFields(topicData?.template);

    const fronts = JSON.stringify(fields.fronts);
    const backs = JSON.stringify(fields.backs);

    setUrlState({
      topic: topicData,
      template: topicData?.Template,
      fronts,
      backs,
      content,
      category,
      topicId: topicData?.id,
      topicName: topicData?.name,
    });
  };

  return { isTopicSelected, selectTopic: selectTopic_ };
}

export default useTopicSelecter;
