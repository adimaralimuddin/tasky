import dynamic from "next/dynamic";
import React, { useState } from "react";
import { FolderType } from "../../../../features/folder/folderTypes";
import { TopicType } from "../../../../features/topic/topicType";
import FolderItemTopics from "./FolderItemTopics";

const FolderDeleter = dynamic(() => import("../folderEditor/FolderDeleter"), {
  ssr: false,
});
const FolderRenamer = dynamic(() => import("../folderEditor/FolderRenamer"), {
  ssr: false,
});
const FolderOptions = dynamic(() => import("./FolderOptions"), { ssr: false });

interface Props {
  data: FolderType & { Topic?: TopicType[] };
  hovered: boolean;
  classId: string;
  setOpen: any;
  open: boolean;
  id: string;
  setSelected: any;
}

function FolderItemContent({
  data,
  id,
  classId,
  open,
  hovered,
  setOpen,
  setSelected,
}: Props) {
  const [renaming, setRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  return (
    <div className=" flex items-center flex-1 ">
      <FolderItemTopics open={open} id={id} setSelected={setSelected} />
      <div className="absolute right-7 top-1 bg-slate-100d dark:bg-slated-600 ">
        <FolderOptions
          data={data}
          hovered={hovered}
          setIsDeleting={setIsDeleting}
          setOpen={setOpen}
          setRenaming={setRenaming}
        />
      </div>

      <FolderRenamer
        data={data}
        renaming={renaming}
        setOpen={setRenaming}
        classId={classId}
      />
      <FolderDeleter
        data={data}
        deleteFolderId={data.id}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
      />
    </div>
  );
}

export default FolderItemContent;
