import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import useWork from "../work/useWork";
import { topicUrl } from "./topicApi";
import { TopicType } from "./topicType";

export default function useTopic(folderId?: string, onSuccess?: any) {
  const client = useQueryClient();
  const { setTopic } = useWork();

  const topicAdder = useMutation(topicApiCreateTopic, {
    onMutate: (topicPayload) => {
      console.log("topic payload", topicPayload);
      setTopic(topicPayload as TopicType);
      client.setQueryData(["topics", folderId], (topics: any) => {
        return [...topics, topicPayload];
      });
    },
    onSuccess: (createdTopic) => {
      client.setQueryData(["topics", folderId], (topics: any) => {
        return topics?.map((t: TopicType) => {
          if (t.name === createdTopic.name && !t?.id) {
            return createdTopic;
          }
          return t;
        });
        // return [...topics, createdTopic];
      });
      // onSuccess?.(createdTopic);
    },
  });

  return {
    topicAdder,
    createTopic: topicAdder.mutate,
  };
}

export async function topicApiCreateTopic(data: {
  userId: string;
  name: string;
  description: string;
  folderId: string;
  templateId: string;
}): Promise<TopicType> {
  const q = gql`
    mutation CreateTopic(
      $userId: String!
      $name: String!
      $description: String!
      $folderId: String!
      $templateId: String!
    ) {
      createTopic(
        userId: $userId
        name: $name
        description: $description
        folderId: $folderId
        templateId: $templateId
      ) {
        name
        description
        id
        folderId
        userId
        templateId
        sample
        template {
          id
          name
          userId
          fronts
          backs
        }
      }
    }
  `;
  // console.log("on creating topic ", { q, data });
  const ret = await request(topicUrl, q, data);
  // console.log("create topic ret ", ret);
  return ret.createTopic;
}
