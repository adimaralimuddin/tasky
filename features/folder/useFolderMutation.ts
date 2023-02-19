import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TbFoldDown } from "react-icons/tb";
// import { folderApideleteFolder } from "./folderApi";
import { FolderType } from "./folderTypes";

export default function useFolderMutation(classId: string) {
  const client = useQueryClient();

  // const folderDeleter = useMutation(folderApideleteFolder, {
  //   onSuccess: (deletedFolder) => {
  //     client.setQueryData(["folder", classId], (folders: any) => {
  //       return folders?.filter(
  //         (folder: FolderType) => folder?.id != deletedFolder?.id
  //       );
  //     });
  //   },
  // });

  return {
    // folderDeleter,
    // deleteFolder: (userId: string, deleteFolderId: string) =>
    //   folderDeleter.mutate({ userId, deleteFolderId }),
  };
}



