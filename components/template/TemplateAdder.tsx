import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TemplateType } from "../../features/template/templateType";
import useTemplate from "../../features/template/useTemplate";
import BoxHover from "../elements/BoxHover";
import Loader from "../elements/Loader";
import TemplateEditor from "./TemplateEditor";

export default function TemplateAdder() {
  const { user } = useUser();
  const { createTemplate, templateAdder } = useTemplate(undefined, user?.sub);
  const [open, setOpen] = useState(false);

  // adimar
  const onSaveTemplate = (data: any) => {
    createTemplate(data);
    setOpen(false);
  };

  return (
    <div>
      <div className="min-h-[80px] flex flex-col justify-center items-center px-6">
        <BoxHover css="flex items-center text-cyan-500 text-lg rounded-full dark:bg-slate-500">
          <FaPlus
            className="text-3xl text-indigo-400 dark:text-white  "
            onClick={() => setOpen(true)}
          />
        </BoxHover>
        <p className="text-slate-500 dark:text-slate-200">add template</p>
      </div>
      <TemplateEditor
        open={open}
        setOpen={setOpen}
        onCancel={() => setOpen(false)}
        onSave={onSaveTemplate}
      />
      <Loader message="adding template ... " open={templateAdder?.isLoading} />
    </div>
  );
}
