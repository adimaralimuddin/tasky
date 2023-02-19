import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { FolderUrl } from "./folderApi";
import { FolderType } from "./folderTypes";

export default function useFolderDeleter(classId: string) {
  const client = useQueryClient();
  const folderDeleter = useMutation(folderApideleteFolder, {
    onMutate: ({ userId, deleteFolderId }) => {
      client.setQueryData(["folder", classId], (folders: any) => {
        return folders?.filter(
          (folder: FolderType) => folder?.id != deleteFolderId
        );
      });
    },
    onSuccess: (deletedFolder) => {
      client.setQueryData(["folder", classId], (folders: any) => {
        return folders?.filter(
          (folder: FolderType) => folder?.id != deletedFolder
        );
      });
    },
  });

  return {
    ...folderDeleter,
    deleteFolder: folderDeleter.mutate,
  };
}

export async function folderApideleteFolder({
  userId,
  deleteFolderId,
}: {
  userId: string;
  deleteFolderId: string;
}): Promise<string> {
  const q = gql`
    mutation Mutation($userId: String!, $deleteFolderId: String!) {
      deleteFolder(userId: $userId, id: $deleteFolderId) {
        name
        id
        sample
        userId
      }
    }
    # mutation DeleteFolder($deleteFolderId: String!) {
    #   deleteFolder(id: $deleteFolderId) {
    #     id
    #     name
    #     sample
    #   }
    # }
  `;

  const ret = await request(FolderUrl, q, { deleteFolderId, userId });
  return ret.deleteFolder;
}
