import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { FolderUrl } from "./folderApi";
import { FolderType } from "./folderTypes";

export default function useFolderRenamer(classId: string) {
  const client = useQueryClient();

  const setName = (renamedFolder: Partial<FolderType>) => {
    client.setQueryData(["folder", classId], (folders: any) => {
      return folders.map((f: FolderType) => {
        if (f.id == renamedFolder.id) {
          return { ...f, name: renamedFolder.name };
        }
        return f;
      });
    });
  };
  const folderRenamer = useMutation(folderApiRenameFolder, {
    onMutate: ({ folderId, ...others }) => {
      setName({ id: folderId, ...others });
    },
    onSuccess: (renamedFolder) => {
      setName(renamedFolder);
    },
  });

  return {
    ...folderRenamer,
    renameFolder: folderRenamer.mutate,
  };
}

export async function folderApiRenameFolder(args: {
  folderId: string;
  name: string;
  userId: string;
}) {
  const q = gql`
    mutation Mutation($userId: String!, $folderId: String!, $name: String!) {
      renameFolder(userId: $userId, folderId: $folderId, name: $name) {
        id
        name
        sample
        userId
      }
    }
  `;
  const ret = await request(FolderUrl, q, args);
  return ret.renameFolder;
}
