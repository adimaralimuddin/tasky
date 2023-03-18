import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import useClassGetter from "../class/useClassGetter";
import { FolderUrl } from "./folderApi";
import { FolderType } from "./folderTypes";

export default function useFolderAdder() {
  const client = useQueryClient();
  const { user } = useUser();
  const classId = useClassGetter().getClassId();
  const folderAdder = useMutation(folderApiAddFolder, {
    onMutate: (userPayload) => {
      client.setQueryData(["folder", classId], (folders: any) => {
        return [...folders, userPayload];
      });
    },
    onSuccess: (newAddedFolder) => {
      client.setQueryData(["folder", classId], (folders: any) => {
        return folders.map((f: FolderType) => {
          if (f.name == newAddedFolder.name && !f?.id) {
            return newAddedFolder;
          }
          return f;
        });
      });
    },
    onError(error) {
      console.log(
        `Error: 
      @useFolderAdder
      msg: `,
        error
      );
    },
  });

  function addFolder(name: string) {
    const allFolders: FolderType[] | undefined = client.getQueryData([
      "folder",
      classId,
    ]);

    if ((allFolders?.length || 0) >= 5) {
      alert(
        `i'm limiting the creation of folders to five for security and database free tier reasons.`
      );
      return;
    }

    folderAdder.mutate({ name, classId, userId: user?.sub });
  }

  return {
    ...folderAdder,
    addFolder,
  };
}

type FolderAdderApiType = {
  classId?: string;
  name: string;
  userId: string | null | undefined;
};
export async function folderApiAddFolder(args: FolderAdderApiType) {
  const q = gql`
    mutation CreateFolder($classId: String!, $userId: String!, $name: String!) {
      createFolder(classId: $classId, userId: $userId, name: $name) {
        id
        classId
        name
        userId
      }
    }
  `;
  const ret = await request(FolderUrl, q, args);
  return ret.createFolder;
}
