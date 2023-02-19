import React from "react";
import { FolderType } from "../../../features/folder/folderTypes";
import useFolder from "../../../features/folder/useFolder";
import TextLoader from "../../elements/TextLoader";
import FolderItem from "../folder/folderItem/FolderItem";

function WorkSideFolders({ classId }: { classId: string }) {
  const { data, isLoading } = useFolder(classId);

  if (isLoading) return <Loader />;

  return (
    <div>
      {!data?.length ? (
        <div>
          <p>no folders!</p>
        </div>
      ) : (
        data?.map((folder: FolderType) => (
          <FolderItem data={folder} key={folder?.id} classId={classId} />
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
