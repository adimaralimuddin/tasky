import { useUser } from "@auth0/nextjs-auth0";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { folderApiAddFolder, folderApiGetFoldersByClassId } from "./folderApi";

export default function useFolder(classId: string | any) {
  const { user } = useUser();
  const client = useQueryClient();

  const folder = useQuery(
    ["folder", classId],
    async () => await folderApiGetFoldersByClassId(classId)
  );

  const add = useMutation(folderApiAddFolder, {
    onSuccess: (newAddedFolder) => {
      console.log("success mutation ", newAddedFolder);
      client.setQueryData(["folder", classId], (folders: any) => {
        return [...folders, newAddedFolder];
      });
    },
  });

  function addFolder(name: string) {
    add.mutate({ name, classId });
  }

  return {
    folder,
    addFolder,
  };
}