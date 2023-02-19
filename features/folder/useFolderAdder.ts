import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import { DEF_USER } from "../../lib/public";
import { FolderUrl } from "./folderApi";
import { FolderType } from "./folderTypes";

export default function useFolderAdder(classId: string) {
  const client = useQueryClient();
  const { user } = useUser();
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
  });

  function addFolder(name: string) {
    folderAdder.mutate({ name, classId, userId: user?.sub || DEF_USER });
  }

  return {
    ...folderAdder,
    addFolder,
  };
}

export async function folderApiAddFolder({
  classId,
  name,
  userId,
}: {
  classId?: string;
  name: string;
  userId: string;
}) {
  // console.log("to add folder", { classId, name, userId });
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
  const ret = await request(FolderUrl, q, { classId, name, userId });
  return ret.createFolder;
}
