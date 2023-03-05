import dynamic from "next/dynamic";
import React, { useState } from "react";
import { FieldType } from "../../features/card/CardType";
import { TemplateType } from "../../features/template/templateType";
import { Trash } from "../../lib/icons";
import Box from "../elements/Box";
import BtnSec from "../elements/BtnSec";
import BtnWarm from "../elements/BtnWarm";
import Modal from "../elements/Modal";

const TemplateUpdater = dynamic(
  () => import("./templateEditor/TemplateUpdater")
);
const TemplateDeleter = dynamic(
  () => import("./templateEditor/TemplateDeleter")
);

type props = {
  template: TemplateType;
  editable?: boolean;
};

export default function TemplateItem({ template, editable = true }: props) {
  const [open, setOpen] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toJson = (fields: string) =>
    typeof fields === "string"
      ? JSON.parse(fields)?.map((p: FieldType, ind: number) => ({ ...p }))
      : fields;

  return (
    <div
      onClick={() => setOpen(true)}
      className={
        "card-all col_ gap-0 flex-1 justify-center cursor-pointer min-w-[100px] max-w-[280px] min-h-[130px] " +
        (template?.sample && " ring-2 dark:ring-indigo-400 ")
      }
    >
      <h3 className="text-prime text-center">{template?.name}</h3>
      <div className="text-phar">
        <p className="text-center">this is just a sample description</p>
      </div>

      {openEditor && (
        <TemplateUpdater
          editable={editable}
          openEditor={openEditor}
          setOpen={setOpen}
          setOpenEditor={setOpenEditor}
          template={template}
        />
      )}

      <Modal open={open} setOpen={setOpen}>
        {(Icon: any) => (
          <div
            onClick={(e: any) => {
              e.stopPropagation();
            }}
            className=" card col_ max-h-[90vh] overflow-autod"
          >
            <Icon />
            <h3>{template?.name}</h3>
            <div className="flex gap-2 flex-wrap overflow-auto flex-1 ">
              <Fields fields={toJson(template?.fronts as any)} />
              <Fields fields={toJson(template?.backs as any)} text="Backs" />
            </div>
            <div className="flex items-center justify-between">
              <BtnWarm className="" onClick={() => setIsDeleting(true)}>
                <Trash /> delete
              </BtnWarm>
              <BtnSec
                onClick={() => {
                  setOpen(false);
                  setOpenEditor(true);
                }}
              >
                edit
              </BtnSec>
            </div>
          </div>
        )}
      </Modal>

      {isDeleting && (
        <TemplateDeleter
          templateId={template?.id}
          editable={editable}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
        />
      )}
    </div>
  );
}

function Fields({
  fields,
  text = "Fronts",
}: {
  fields: FieldType[];
  text?: string;
}) {
  return (
    <div className="flex-1 bg-slate-50 dark:bg-slate-700 p-2 rounded-lg ">
      <h3 className="flex-1">{text}</h3>
      {fields?.map((front: FieldType) => (
        <FieldItem front={front} key={front.text} />
      ))}
    </div>
  );
}

function FieldItem({ front }: { front: FieldType }) {
  return (
    <div className="flex gap-2 justify-between items-center bg-white dark:bg-slate-500 flex-1 ring-1 p-2  rounded-md  ring-slate-200 shadow-md my-3">
      <p>{front.text}</p>:<p>{front.type}</p>
    </div>
  );
}
