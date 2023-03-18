import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TemplateType } from "../../../features/template/templateType";
import useTemplate from "../../../features/template/useTemplate";
import { ENTITY_LIMIT } from "../../../lib/public";
import TemplateEditor from "./TemplateEditor";

interface Props {
  myTemplates: TemplateType[];
}
export default function TemplateAdder({ myTemplates }: Props) {
  const { user } = useUser();
  const { createTemplate } = useTemplate(undefined, user?.sub);
  const [open, setOpen] = useState(false);

  const onSaveTemplate = (data: any) => {
    createTemplate(data);
    setOpen(false);
  };

  const checkLimit = () => {
    return myTemplates?.length >= ENTITY_LIMIT ? true : false;
  };

  return (
    <div>
      {checkLimit() ? (
        <div>
          <h3 className="text-accent font-semibold">0 template left!</h3>
          <p className="text-pink-500 dark:text-pink-400">
            you have reach the limit
          </p>
        </div>
      ) : (
        <div
          onClick={() => setOpen(true)}
          className=" flex_ items-center px-2 cursor-pointer text-value "
        >
          <FaPlus className="" />
          <p className=" font-bold">New Template</p>
        </div>
      )}
      <TemplateEditor
        title="Adding New Template"
        open={open}
        setOpen={setOpen}
        onCancel={() => setOpen(false)}
        onSave={onSaveTemplate}
      />
    </div>
  );
}
