import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DEF_USERID } from "../../lib/public";
import { FolderUrl } from "./folderApi";
import { FolderType } from "./folderTypes";

export default function useFolderRenamer(classId: string) {
  const client = useQueryClient();
  const { user } = useUser();

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
    onMutate: (folderData) => {
      const { folderId, ...others } = folderData;

      setName({ id: folderId, ...others });
    },
    onSuccess: (renamedFolder) => {
      setName(renamedFolder);
    },
    onError(error) {
      console.log(
        `Error: 
      @useFolderRenamer
      msg: `,
        error
      );
    },
  });

  const renameFolder = (folderPayload: FolderRenamerArgsApi) => {
    folderPayload.userId = user?.sub || DEF_USERID;
    folderRenamer.mutate(folderPayload);
  };

  return {
    ...folderRenamer,
    renameFolder,
  };
}

type FolderRenamerArgsApi = {
  folderId: string;
  name: string;
  userId?: string;
  classId: string;
};
export async function folderApiRenameFolder(args: FolderRenamerArgsApi) {
  const q = gql`
    mutation RenameFolder(
      $userId: String!
      $classId: String!
      $folderId: String!
      $name: String!
    ) {
      renameFolder(
        userId: $userId
        classId: $classId
        folderId: $folderId
        name: $name
      ) {
        userId
        sample
        name
        classId
      }
    }
  `;
  const ret = await request(FolderUrl, q, args);

  return ret.renameFolder;
}
