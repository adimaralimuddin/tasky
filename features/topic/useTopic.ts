import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { TopicIcon } from "../../lib/icons";
import { DEF_USER } from "../../lib/public";
import { RootState } from "../../store";
import { setTopicOpenState } from "../app/appSlice";
import useFolderGetter from "../folder/useFolderGetter";
import { TopicUrl } from "./topicApi";
import { TopicType } from "./topicType";
import useTopicSelecter from "./useTopicSelecter";

export default function useTopic() {
  const client = useQueryClient();
  const patch = useDispatch();
  const { user } = useUser();

  const { selectedFolderId } = useFolderGetter();

  const topicAdderOpenState = useSelector(
    (s: RootState) => s.app.topicAdderOpenState
  );

  const setOpenTopicAdder = (val: boolean) => patch(setTopicOpenState(val));

  const { selectTopic } = useTopicSelecter();

  const topicAdder = useMutation(topicApiCreateTopic, {
    onMutate: (topicPayload) => {
      try {
        client.setQueryData(["topics", selectedFolderId], (topics: any) => {
          return [...topics, topicPayload];
        });
      } catch (error) {
        console.log(`Error: useTopicAdder onAddMutate: `, error);
      }
    },
    onSuccess: (createdTopic) => {
      client.setQueryData(["topics", selectedFolderId], (topics: any) => {
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

  const createTopic = (topicPayload: TopicType) => {
    const id = nanoid();
    const folderId = selectedFolderId;
    const userId = user?.sub || DEF_USER;
    const topicFinalData = { ...topicPayload, id, folderId, userId };

    if (!topicFinalData?.template)
      return console.log(
        "Validate: useTopicAdder addTopic : template is required:",
        topicPayload
      );

    selectTopic(topicFinalData as TopicType, "cardadder");
    setOpenTopicAdder(false);

    topicAdder.mutate(topicFinalData as TopicType, {
      onSuccess(x) {
        console.log(`topic created`, x);
      },
    });
  };

  return {
    topicAdder,
    topicAdderOpenState,
    createTopic,
    setOpenTopicAdder,
  };
}

export async function topicApiCreateTopic(
  topicPayload: TopicType
): Promise<TopicType> {
  // extract to exclude template, createTopic arguments only needs topic with templateId field
  const { template, ...topicWithoutTemplate } = topicPayload;
  const q = gql`
    mutation Mutation(
      $id: String!
      $userId: String!
      $name: String!
      $folderId: String!
      $templateId: String!
      $description: String
    ) {
      createTopic(
        id: $id
        userId: $userId
        name: $name
        folderId: $folderId
        templateId: $templateId
        description: $description
      ) {
        userId
        templateId
        sample
        name
        id
        folderId
        description
        template {
          userId
          name
          id
          fronts
          deleted
          backs
        }
      }
    }
  `;
  // console.log("on creating topic ", { q, data });
  const ret = await request(TopicUrl, q, topicWithoutTemplate);
  return ret.createTopic;
}
