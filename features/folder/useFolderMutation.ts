import { useMutation, useQueryClient } from "@tanstack/react-query";
import { folderApideleteFolder, folderApiRenameFolder } from "./folderApi";
import { FolderType } from "./folderTypes";

export default function useFolderMutation(classId: string) {
  const client = useQueryClient();

  const folderDeleter = useMutation(folderApideleteFolder, {
    onSuccess: (deletedFolder) => {
      client.setQueryData(["folder", classId], (folders: any) => {
        return folders?.filter(
          (folder: FolderType) => folder?.id != deletedFolder?.id
        );
      });
    },
  });

  const renameFolder = useMutation(folderApiRenameFolder, {
    onSuccess: (renamedFolder) => {
      client.setQueryData(["folder", classId], (folders: any) => {
        return folders.map((f: FolderType) => {
          if (f.id == renamedFolder.id) {
            return { ...f, name: renamedFolder.name };
          }
          return f;
        });
      });
    },
  });

  return {
    folderDeleter,
    deleteFolder: (userId: string, deleteFolderId: string) =>
      folderDeleter.mutate({ userId, deleteFolderId }),
    renameFolder: renameFolder.mutate,
  };
}
