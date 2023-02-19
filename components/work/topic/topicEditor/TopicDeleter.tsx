import React from "react";
import { TopicType } from "../../../../features/topic/topicType";
import useTopicDeleter from "../../../../features/topic/useTopicDeleter";
import Loader from "../../../elements/Loader";
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
  const { deleteTopic, isLoading } = useTopicDeleter(data.folderId);
  return (
    <div>
      <Verifier
        message="are you sure to delete this topic"
        open={isDeleting}
        setOpen={setIsDeleting}
        onOkay={() => deleteTopic(data)}
      />
      {/* <Loader message="deleting topic ... " open={isLoading} /> */}
    </div>
  );
}
