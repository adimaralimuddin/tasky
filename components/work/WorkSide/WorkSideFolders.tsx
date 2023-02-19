import React from "react";
import { FolderType } from "../../../features/folder/folderTypes";
import useFolder from "../../../features/folder/useFolder";
import TextLoader from "../../elements/TextLoader";
import FolderItem from "../folder/folderItem/FolderItem";

function WorkSideFolders({ classId }: { classId: string }) {
  const { data } = useFolder(classId);

  return (
    <div>
      {/* work side {data?.length} */}
      {!data?.length ? (
        <Loader />
      ) : (
        data?.map((folder: FolderType) => (
          <FolderItem
            data={folder}
            key={folder?.id}
            classId={classId}
            setSideBar={() => () => {}}
          />
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
