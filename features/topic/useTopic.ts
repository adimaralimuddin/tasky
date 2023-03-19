import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { nanoid } from "nanoid";
import { useDispatch, useSelector } from "react-redux";
import { ENTITY_LIMIT } from "../../lib/public";
import { RootState } from "../../store";
import { setTopicOpenState } from "../app/appSlice";
import useFolderGetter from "../app/folders/useFolderGetter";
import useClassGetter from "../class/useClassGetter";
import { TopicUrl } from "./topicApi";
import { TopicType } from "./topicType";
import useTopicSelecter from "./useTopicSelecter";

export default function useTopic() {
  const client = useQueryClient();
  const patch = useDispatch();
  const { user } = useUser();
  const { class_ } = useClassGetter();

  const { getSelectedFolder } = useFolderGetter();

  const topicAdderOpenState = useSelector(
    (s: RootState) => s.app.topicAdderOpenState
  );

  const setOpenTopicAdder = (val: boolean) => patch(setTopicOpenState(val));

  const { selectTopic } = useTopicSelecter();

  const topicAdder = useMutation(topicApiCreateTopic, {
    onMutate: (topicPayload) => {
      try {
        client.setQueryData(["topics", getSelectedFolder()], (topics: any) => {
          return [...topics, topicPayload];
        });
      } catch (error) {
        console.log(
          `Error:
        @useTopicAdder/onMutate
        msg: `,
          error
        );
      }
    },
    onSuccess: (createdTopic) => {
      client.setQueryData(["topics", getSelectedFolder()], (topics: any) => {
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

  const checkTopicLimits = () => {
    const topicTotal: TopicType[] | undefined = client.getQueryData([
      "topics",
      getSelectedFolder(),
    ]);
    if ((topicTotal?.length || 0) >= ENTITY_LIMIT) {
      alert(
        `i'm limiting the creation of topics to five for security and database free tier reasons.`
      );
      return false;
    }
    return true;
  };

  const createTopic = (topicPayload: TopicType) => {
    if (!checkTopicLimits()) return;

    const id = nanoid();
    const folderId = getSelectedFolder();
    const userId = user?.sub;
    const topicFinalData = {
      ...topicPayload,
      classId: class_?.id,
      id,
      folderId,
      userId,
    } as TopicType;

    if (!topicFinalData?.template)
      return console.log(
        `Validate:
        @useTopicAdder/addTopic 
        msg: template is required:`,
        topicPayload
      );

    selectTopic(topicFinalData, "cardadder");

    topicAdder.mutate(topicFinalData, {
      onSuccess(x) {},
      onError(error) {
        console.log(
          `Error:
        @useTopicAdder/onError
        msg: `,
          error
        );
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
  const { template: excluded_, ...topicWithoutTemplate } = topicPayload;

  const q = gql`
    mutation Mutation(
      $id: String!
      $classId: String!
      $userId: String
      $name: String!
      $folderId: String!
      $templateId: String!
      $description: String
    ) {
      addTopic(
        id: $id
        classId: $classId
        name: $name
        folderId: $folderId
        templateId: $templateId
        description: $description
        userId: $userId
      ) {
        id
        name
        folderId
        sample
        userId
        templateId
        description
      }
    }
  `;
  const ret = await request(TopicUrl, q, topicWithoutTemplate);
  return ret.createTopic;
}
