import { loadGetInitialProps } from "next/dist/shared/lib/utils";
import React from "react";
import { CardTypes } from "../../../features/card/CardType";
import { FolderType } from "../../../features/folder/folderTypes";
import useFolder from "../../../features/folder/useFolder";
import { TopicType } from "../../../features/topic/topicType";
import FolderItem from "../folder/folderItem/FolderItem";

function WorkSideFolders({ classId, post }: { classId: string; post: any }) {
  const { data: clientFolders } = useFolder(classId);
  const folders = clientFolders;

  return (
    <div className="flex-1  max-h-full overflow-y-auto hidden lg:block group-hover:block p-3  col_ gap-0">
      {!folders?.length ? (
        <div>
          <p>no folders!</p>
        </div>
      ) : (
        <div className="col_ gap-0 ">
          {folders?.map((folder: FolderType) => (
            <FolderItem key={folder?.id} data={folder} classId={classId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkSideFolders;
