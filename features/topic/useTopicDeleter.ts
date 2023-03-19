import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { useDispatch } from "react-redux";
import { setContent } from "../card/cardSlice";
import useClassGetter from "../class/useClassGetter";
import { TopicUrl } from "./topicApi";
import { TopicType } from "./topicType";

export default function useTopicDeleter(folderId: string) {
  const client = useQueryClient();
  const dispatch = useDispatch();
  const { user } = useUser();
  const classId = useClassGetter().getClassId();

  const topicDeleter = useMutation(topicApiDeleteTopic, {
    onMutate: ({ topicId }) => {
      client.setQueryData(["topics", folderId], (topics: any) => {
        return topics?.filter((topic: TopicType) => topic?.id !== topicId);
      });
    },
    onSuccess: (deletedTopic) => {
      client.setQueryData(["topics", folderId], (topics: any) => {
        return topics?.filter(
          (topic: TopicType) => topic?.id !== deletedTopic?.id
        );
      });
      dispatch(setContent("dashboard"));
    },
    onError(error) {
      console.log(
        `Error:
      @useTopicDeleter
      msg: `,
        error
      );
    },
  });

  const deleteTopic = (data: any) => {
    if (data?.sample) {
      return alert(
        "sample topic will not be deleted. you can always create, edit and delete your own topic"
      );
    }
    topicDeleter.mutate({
      userId: user?.sub,
      classId,
      topicId: data?.id,
    });
  };
  return { ...topicDeleter, deleteTopic };
}

type TopicDeleteApiType = {
  userId?: string | undefined | null;
  topicId: string;
  classId: string;
};
export async function topicApiDeleteTopic(args: TopicDeleteApiType) {
  const q = gql`
    mutation Mutation($userId: String, $classId: String!, $topicId: String!) {
      deleteTopic(userId: $userId, classId: $classId, topicId: $topicId) {
        name
        id
        userId
        folderId
        templateId
      }
    }
  `;
  const ret = await request(TopicUrl, q, args);
  return ret?.deleteTopic;
}
