import React from "react";
import { TopicType } from "../../../../features/topic/topicType";
import useTopicDeleter from "../../../../features/topic/useTopicDeleter";
import Verifier from "../../../elements/Verifier";

interface Props {
  isDeleting: boolean;
  setIsDeleting: any;
  data: TopicType;
}
export default function TopicDeleter({
  data,
  isDeleting,
  setIsDeleting,
}: Props) {
  const { deleteTopic } = useTopicDeleter(data.folderId);
  return (
    <Verifier
      message="are you sure to delete this topic"
      open={isDeleting}
      setOpen={setIsDeleting}
      onOkay={() => deleteTopic(data)}
    />
  );
}
