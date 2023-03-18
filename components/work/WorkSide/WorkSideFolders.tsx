import React from "react";
import useClassGetter from "../../../features/class/useClassGetter";
import useFolders from "../../../features/folder/useFolders";
import FolderItem from "../folder/folderItem/FolderItem";

function WorkSideFolders() {
  const classId = useClassGetter().getClassId();
  const { data: folders, isLoading } = useFolders(classId);

  return (
    <div className="flex-1  max-h-full overflow-y-auto hidden lg:block group-hover:block p-3  col_ gap-0">
      {!folders?.length && !isLoading ? (
        <div className="text-center">
          <p className="text-phar text-center">No folders!</p>
          <small className="text-accent">Try to add a folder.</small>
        </div>
      ) : (
        <div className="col_ gap-0 ">
          {folders?.map((folder) => (
            <FolderItem key={folder?.id} data={folder} classId={classId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkSideFolders;
