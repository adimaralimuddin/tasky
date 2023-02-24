import { TopicType } from "../topic/topicType";

export type FolderType = {
  id: string;
  name: string;
  userId: string;
  sample?: boolean;
  Topic?: TopicType[];
};
