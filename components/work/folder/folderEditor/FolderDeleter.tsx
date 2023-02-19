import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { FolderType } from "../../../../features/folder/folderTypes";
import useFolderDeleter from "../../../../features/folder/useFolderDeleter";
import { DEF_USER } from "../../../../lib/public";
import Loader from "../../../elements/Loader";
import Verifier from "../../../elements/Verifier";

interface Props {
  data: FolderType;
  classId: string;
  deleteFolderId: string;
  isDeleting: boolean;
  setIsDeleting: (...args: any) => any;
}
export default function FolderDeleter({
  classId,
  deleteFolderId,
  data,
  isDeleting,
  setIsDeleting,
}: Props) {
  const { user } = useUser();
  const { deleteFolder, isLoading } = useFolderDeleter(classId);

  const ondeleteHandler = () => {
    if (data?.sample) {
      return alert(
        "sample folder will not be deleted. you can always create, edit and delete your own folder."
      );
    }
    deleteFolder({ userId: user?.sub || DEF_USER, deleteFolderId });
  };
  return (
    <>
      <Verifier
        message="are you sure to delete this folder"
        open={isDeleting}
        setOpen={setIsDeleting}
        onOkay={ondeleteHandler}
      />
      <Loader message="deleting folder ..." open={isLoading} />
    </>
  );
}
