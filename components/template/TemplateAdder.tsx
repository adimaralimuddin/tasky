import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TemplateType } from "../../features/template/templateType";
import useTemplate from "../../features/template/useTemplate";
import BoxHover from "../elements/BoxHover";
import TemplateEditor from "./TemplateEditor";

export default function TemplateAdder() {
  const { createTemplate } = useTemplate();
  const [open, setOpen] = useState(false);

  const onSaveTemplate = (data: TemplateType) => {
    createTemplate(data);
    setOpen(false);
  };

  return (
    <div>
      <div className="min-h-[80px] flex flex-col justify-center items-center px-6">
        <BoxHover css="flex items-center text-cyan-500 text-lg rounded-full">
          <FaPlus
            className="text-3xl text-indigo-400  "
            onClick={() => setOpen(true)}
          />
        </BoxHover>
        <p className="text-slate-500">add template</p>
      </div>
      <TemplateEditor
        open={open}
        setOpen={setOpen}
        onCancel={() => setOpen(false)}
        onSave={onSaveTemplate}
      />
    </div>
  );
}
