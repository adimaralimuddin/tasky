import React from "react";
import { FolderType } from "../../../features/folder/folderTypes";
import useFolder from "../../../features/folder/useFolder";
import TextLoader from "../../elements/TextLoader";
import FolderItem from "../folder/folderItem/FolderItem";

function WorkSideFolders({ classId, post }: { classId: string; post: any }) {
  const { data: folderData, isLoading } = useFolder(classId);

  const data = post?.folders;

  // if (isLoading) return <Loader />;

  return (
    <div>
      {!data?.length ? (
        <div>
          <p>no folders!</p>
        </div>
      ) : (
        data?.map((folder: FolderType) => (
          <FolderItem key={folder?.id} data={folder} classId={classId} />
        ))
      )}
    </div>
  );
}

const Loader = () => (
  <div className="col_">
    <TextLoader />
    <TextLoader />
    <TextLoader />
  </div>
);

export default WorkSideFolders;
