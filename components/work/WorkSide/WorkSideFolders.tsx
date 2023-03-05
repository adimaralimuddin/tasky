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
  // const serverFolders = post?.folders;

  // let folders = clientFolders || post.folders;
  // folders = folders.map((folder: any) => {
  //   // filter topics
  //   if (!folder?.Topic) {
  //     const gotTopic = serverFolders.find((p: any) => p.id == folder.id);
  //     if (gotTopic && gotTopic?.Topic) {
  //       folder.Topic = [...gotTopic.Topic];
  //     }
  //   }

  //   return folder;
  // }); // folders = folder.map // choose between server and client folder data

  // console.log(`final folders`, folders);

  return (
    <div className=" hidden lg:block group-hover:block p-3">
      <h4 className="text-sec font-semibold">Folders</h4>
      {!folders?.length ? (
        <div>
          <p>no folders!</p>
        </div>
      ) : (
        <div className="col_d">
          {folders?.map((folder: FolderType) => (
            <FolderItem key={folder?.id} data={folder} classId={classId} />
          ))}
        </div>
      )}
    </div>
  );
}

export default WorkSideFolders;
