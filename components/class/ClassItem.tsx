import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useState } from "react";
import { ClassType } from "../../features/class/classTypes";
import Box from "../elements/Box";
import Option from "../elements/Option";

const ClassEditor = dynamic(() => import("./classEditor/ClassEditor"), {
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
    <div
      className={
        "card-all col_ gap-0 flex-1 min-w-[160px] max-w-[280px] transition min-h-[130px]  "
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
          <h4 className="text-prime font-bold ">{data?.name}</h4>
          <p className="text-sm text-sec overflow-hidden">
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
    </div>
  );
}

export default ClassItem;
