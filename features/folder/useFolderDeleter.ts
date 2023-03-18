import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import useClassGetter from "../class/useClassGetter";
import { FolderUrl } from "./folderApi";
import { FolderType } from "./folderTypes";

export default function useFolderDeleter() {
  const client = useQueryClient();
  const { user } = useUser();
  const classId = useClassGetter().getClassId();

  const folderDeleter = useMutation(folderDeleterReq, {
    onMutate: ({ id }) => {
      client.setQueryData(["folder", classId], (folders: any) => {
        return folders?.filter((folder: FolderType) => folder?.id != id);
      });
    },
    onSuccess: (deletedFolder) => {
      client.setQueryData(["folder", classId], (folders: any) => {
        return folders?.filter(
          (folder: FolderType) => folder?.id != deletedFolder
        );
      });
    },
    onError(error) {
      console.log(
        `Error:
      @useFolderDeleter
      msg: `,
        error
      );
    },
  });

  const deleteFolder = (folderData: DeleteFolderMutateArgsType) => {
    const folderToDeleteArgs: DeleteFolderReqArgsType = {
      ...folderData,
      userId: user?.sub || undefined,
      classId,
    };
    folderDeleter.mutate(folderToDeleteArgs);
  };

  return {
    ...folderDeleter,
    deleteFolder,
  };
}

type DeleteFolderMutateArgsType = {
  id: string;
};

type DeleteFolderReqArgsType = DeleteFolderMutateArgsType & {
  classId: string;
  userId: string | undefined;
};

export async function folderDeleterReq(
  args: DeleteFolderReqArgsType
): Promise<string> {
  const q = gql`
    mutation Mutation($userId: String, $classId: String!, $id: String!) {
      deleteFolder(userId: $userId, classId: $classId, id: $id) {
        name
        id
        sample
        userId
      }
    }
  `;

  const ret = await request(FolderUrl, q, args);
  return ret.deleteFolder;
}
