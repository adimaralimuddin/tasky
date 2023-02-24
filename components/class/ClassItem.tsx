import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";
import Box from "../elements/Box";
import Option from "../elements/Option";
import { ClassType } from "./classTypes";

const ClassEditor = dynamic(() => import("./ClassEditor"), {
  ssr: false,
});
const ClassDeleter = dynamic(() => import("./classEditor/ClassDeleter"), {
  ssr: false,
});

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

  return (
    <Box
      css={
        "flex-1  min-w-[160px] max-w-[280px]     transition flex flex-col min-h-[130px] flex-1 shadow-none ring-1 ring-slate-200 "
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && !data?.preview && (
        <span className="relative">
          <div className="absolute top-0 right-0">
            <Option options={options} left={true} />
          </div>
        </span>
      )}

      <Link prefetch={false} href={`/class/${data?.id}`}>
        <div
          title={`
          ${data?.name}
${data?.description}
          `}
          className="flex-1 flex flex-col cursor-pointer hover:font-boldd text-center justify-center"
        >
          <p className="text-violet-400 font-800 ">{data?.name}</p>
          <p className="text-slate-400 text-sm overflow-hidden">
            {data?.description}
          </p>
        </div>
      </Link>

      {isEditing ? (
        <ClassEditor
          setIsEditing={setIsEditing}
          open={isEditing}
          setOpen={setIsEditing}
          data={data}
          editable={editable}
        />
      ) : null}

      {isDeleting ? (
        <ClassDeleter
          data={data}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          editable={editable}
          setIsEditing={setIsEditing}
        />
      ) : null}
    </Box>
  );
}

export default ClassItem;
