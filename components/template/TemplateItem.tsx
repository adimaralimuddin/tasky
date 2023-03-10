import dynamic from "next/dynamic";
import React, { useState } from "react";
import { FieldType } from "../../features/card/CardType";
import { TemplateType } from "../../features/template/templateType";
import { Trash } from "../../lib/icons";
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
      onClick={() => setOpen((p) => !p)}
      className={
        "card card-shadow card-ring hover:shadow-xl hover:shadow-slate-200 dark:hover:shadow-black transition col_  gap-0 flex-1 justify-center cursor-pointer min-w-[200px] sm:max-w-[280px] min-h-[100px] "
      }
    >
      <h4
        title={template?.name}
        className="text-prime font-bold text-center overflow-hidden   max-h-[100px]"
      >
        {template?.name}
      </h4>

      {openEditor && (
        <TemplateUpdater
          editable={editable}
          openEditor={openEditor}
          setOpen={setOpen}
          setOpenEditor={setOpenEditor}
          template={template}
        />
      )}
      <Modal className="max-w-4xl" open={open} setOpen={setOpen}>
        {() => (
          <div
            onClick={(e: any) => {
              e.stopPropagation();
            }}
            className=" card col_ max-h-[90vh] "
          >
            <h3>{template?.name}</h3>
            <div className="flex gap-2 flex-wrap overflow-auto flex-1 ">
              <Fields fields={toJson(template?.fronts as any)} />
              <Fields fields={toJson(template?.backs as any)} text="Backs" />
            </div>
            <div className="flex items-center justify-between">
              <button className="btn-warm" onClick={() => setIsDeleting(true)}>
                <Trash /> delete
              </button>
              <button
                className="btn-sec"
                onClick={() => {
                  setOpen(false);
                  setOpenEditor(true);
                }}
              >
                edit
              </button>
            </div>
          </div>
        )}
      </Modal>
      {isDeleting && (
        <TemplateDeleter
          setOpen={setOpen}
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
    <div className="flex-1 bg-slate-50 dark:bg-layer-100 p-2 rounded-lg ">
      <h3 className="flex-1">{text}</h3>
      {fields?.map((front: FieldType) => (
        <FieldItem front={front} key={front.text} />
      ))}
    </div>
  );
}

function FieldItem({ front }: { front: FieldType }) {
  return (
    <div className="flex gap-2 justify-between items-center bg-slate-200 dark:bg-layer-sec flex-1 ring-1d p-2 px-3  rounded-md my-3">
      <p>{front.text}</p>:<p>{front.type}</p>
    </div>
  );
}
