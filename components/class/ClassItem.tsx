import Link from "next/link";
import React, { useState } from "react";
import useClass from "../../features/class/useClass";
import Box from "../elements/Box";
import Loader from "../elements/Loader";
import Option from "../elements/Option";
import Verifier from "../elements/Verifier";
import ClassEditor from "./ClassEditor";
import { ClassType } from "./classTypes";

function ClassItem({
  data,
  editable = true,
}: {
  data: ClassType;
  editable?: boolean;
  key?: any;
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { deleteClass, classUpdater, updateClass, classDeleter } = useClass(
    data?.id
  );
  const options = [
    {
      text: "edit",
      action: () => setIsEditing(true),
    },
    {
      text: "delete",
      action: () => setIsDeleting(true),
    },
  ];

  const onSave = async (data: any) => {
    if (!editable) {
      return alert(
        "sample class will not be edited. you can always login and create or delete your own class"
      );
    }
    updateClass(data);
    setIsEditing(false);
  };

  const onDelete = () => {
    if (!editable) {
      return alert(
        "sample class will not be deleted. you can always login and create or delete your own class"
      );
    }
    deleteClass(data?.id);
    setIsEditing(false);
  };

  return (
    <Box
      css={
        "flex-1  min-w-[160px] max-w-[280px]     transition flex flex-col min-h-[130px]  "
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Loader message="updating class ... " open={classUpdater?.isLoading} />
      <ClassEditor
        onSave={onSave}
        open={isEditing}
        setOpen={setIsEditing}
        data={data}
      />

      {hovered && (
        <span className="relative">
          <div className="absolute top-0 right-0">
            <Option options={options} left={true} />
          </div>
        </span>
      )}

      <Link href={`/class/${data?.id}`}>
        <div
          title={`
          ${data?.name}
${data?.description}
          `}
          className="flex-1 flex flex-col cursor-pointer hover:font-boldd text-center justify-center"
        >
          <h2 className="text-indigo-400 text-xl">{data?.name}</h2>
          <p className="text-slate-400 text-sm overflow-hidden">
            {data?.description}
          </p>
        </div>
      </Link>

      <Verifier
        open={isDeleting}
        setOpen={setIsDeleting}
        message="folders and topics will also be permanently deleted"
        onOkay={onDelete}
      />
      <Loader message="deleting class ... " open={classDeleter?.isLoading} />
    </Box>
  );
}

export default ClassItem;
