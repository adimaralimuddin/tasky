import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { TemplateType } from "../../features/template/templateType";
import useTemplateMutation from "../../features/template/useTemplateMutation";
import { Trash } from "../../lib/icons";
import Box from "../elements/Box";
import BtnSec from "../elements/BtnSec";
import BtnWarm from "../elements/BtnWarm";
import Loader from "../elements/Loader";
import Modal from "../elements/Modal";
import Verifier from "../elements/Verifier";
import TemplateEditor from "./TemplateEditor";

type props = {
  template: TemplateType;
};

type FieldType = {
  text: string;
  type: string;
  ind?: number;
};

export default function TemplateItem({ template }: props) {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const toJson = (fields: string) =>
    JSON.parse(fields)?.map((p: FieldType, ind: number) => ({ ...p }));

  const { deleteTemplate, templateDeleter, updateTemplate, templateUpdater } =
    useTemplateMutation(user?.sub);

  const onSaveHandler = (data: any) => {
    console.log("pre id ", template.id);
    updateTemplate({ ...data, id: template.id });
    setOpen(true);
  };

  const onEdithandler = () => {
    setOpen(false);
    setOpenEditor(true);
  };

  return (
    <Box
      onClick={() => setOpen(true)}
      css="flex flex-col items-center justify-center cursor-pointer min-w-[100px] flex-1 max-w-sm min-h-[80px]"
    >
      <p className="text-center">{template.name}</p>
      <TemplateEditor
        name_={template.name}
        open={openEditor}
        setOpen={setOpenEditor}
        fronts_={toJson(template.fronts)}
        backs_={toJson(template.backs)}
        onSave={onSaveHandler}
        onCancel={() => {
          setOpen(true);
          setOpenEditor(false);
        }}
      />
      <Modal open={open} setOpen={setOpen}>
        {(Icon: any) => (
          <Box
            onClick={(e: any) => {
              e.stopPropagation();
            }}
            css="flex flex-col max-h-[90vh] overflow-autod"
          >
            <Icon />
            <h3>{template?.name}</h3>
            <div className="flex gap-2 flex-wrap overflow-auto flex-1 ">
              <Fields fields={toJson(template.fronts)} />
              <Fields fields={toJson(template.backs)} text="Backs" />
            </div>
            <div className="flex items-center justify-between">
              <BtnWarm className="" onClick={() => setIsDeleting(true)}>
                <Trash /> delete
              </BtnWarm>
              <BtnSec onClick={onEdithandler}>edit</BtnSec>
            </div>
          </Box>
        )}
      </Modal>
      <Verifier
        message="are you sure to delete this template?"
        open={isDeleting}
        setOpen={setIsDeleting}
        onOkay={() => deleteTemplate(template?.id)}
      />
      <Loader
        message="deleting template ... "
        open={templateDeleter?.isLoading}
      />
      <Loader
        message="updating template ... "
        open={templateUpdater?.isLoading}
      />
    </Box>
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
