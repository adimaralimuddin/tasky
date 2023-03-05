import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TemplateType } from "../../../features/template/templateType";
import useTemplate from "../../../features/template/useTemplate";
import BoxHover from "../../elements/BoxHover";
import Loader from "../../elements/Loader";
import TemplateEditor from "./TemplateEditor";

export default function TemplateAdder() {
  const { user } = useUser();
  const { createTemplate, templateAdder } = useTemplate(undefined, user?.sub);
  const [open, setOpen] = useState(false);

  // adimar
  const onSaveTemplate = (data: any) => {
    console.log(`data`, data);

    createTemplate(data);
    setOpen(false);
  };

  return (
    <div>
      <div
        onClick={() => setOpen(true)}
        className=" flex_ items-center px-2 cursor-pointer text-value "
      >
        <FaPlus className="" />
        <p className=" font-bold">New Template</p>
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
