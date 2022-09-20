import React, { useState } from "react";
import { TemplateType } from "../../features/template/templateType";
import useTemplateMutation from "../../features/template/useTemplateMutation";
import { Trash } from "../../lib/icons";
import Box from "../elements/Box";
import BtnSec from "../elements/BtnSec";
import BtnWarm from "../elements/BtnWarm";
import Modal from "../elements/Modal";
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
  const [open, setOpen] = useState(false);
  const [openEditor, setOpenEditor] = useState(false);

  const toJson = (fields: string) =>
    JSON.parse(fields)?.map((p: FieldType, ind: number) => ({ ...p }));

  const { deleteTemplate, updateTemplate } = useTemplateMutation();

  const onSaveHandler = (data: any) => {
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
            <div className="flex ">
              <h3 className="flex-1">Fronts</h3>
              <h3 className="flex-1">Backs</h3>
            </div>
            <div className="flex gap-2 overflow-auto flex-1 p-2 bg-slate-50 rounded-lg">
              <div>
                {toJson(template.fronts)?.map((front: FieldType) => (
                  <FieldItem front={front} key={front.text} />
                ))}
              </div>
              <div>
                {toJson(template.backs)?.map((front: FieldType) => (
                  <FieldItem front={front} key={front.text} />
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <BtnWarm
                className=""
                onClick={() => deleteTemplate(template?.id)}
              >
                <Trash /> delete
              </BtnWarm>
              <BtnSec onClick={onEdithandler}>edit</BtnSec>
            </div>
          </Box>
        )}
      </Modal>
    </Box>
  );
}

function FieldItem({ front }: { front: FieldType }) {
  return (
    <div className="bg-white flex-1 ring-1 px-2 p-1 rounded-md my-3 ring-slate-200 shadow-md ">
      <div className="items-center justify-between flex gap-2 py-2">
        <p>{front.text}</p> :<p>{front.type}</p>
      </div>
    </div>
  );
}
