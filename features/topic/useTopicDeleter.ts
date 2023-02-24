import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { useDispatch } from "react-redux";
import { DEF_USER } from "../../lib/public";
import { setContent } from "../card/cardSlice";
import { TopicUrl } from "./topicApi";
import { TopicType } from "./topicType";

export default function useTopicDeleter(folderId: string) {
  const client = useQueryClient();
  const dispatch = useDispatch();
  const { user } = useUser();

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
  });

  const deleteTopic = (data: any) => {
    if (data?.sample) {
      return alert(
        "sample topic will not be deleted. you can always create, edit and delete your own topic"
      );
    }
    topicDeleter.mutate({ userId: user?.sub || DEF_USER, topicId: data?.id });
  };
  return { ...topicDeleter, deleteTopic };
}

export async function topicApiDeleteTopic({
  userId,
  topicId,
}: {
  userId: string;
  topicId: string;
}) {
  const q = gql`
    mutation Mutation($userId: String!, $topicId: String!) {
      deleteTopic(userId: $userId, topicId: $topicId) {
        name
        id
        userId
        folderId
        templateId
      }
    }
  `;
  const ret = await request(TopicUrl, q, { userId, topicId });
  return ret?.deleteTopic;
}
