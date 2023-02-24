import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { TemplateType } from "../../features/template/templateType";
import useTemplates from "../../features/template/useTemplates";
import LayoutMainHeader from "../layouts/LayoutMainHeader";
import TemplateAdder from "./TemplateAdder";
import TemplateItem from "./TemplateItem";

export default function TemplatePage() {
  const { user } = useUser();
  const { myTemplates, sampleTemplates } = useTemplates(user?.sub);

  return (
    <div>
      <LayoutMainHeader />
      <div className="flex gap-2 w-full max-w-4xl mx-auto my-2 py-4 p-2 flex-wrap contents-center justify-center">
        <TemplateAdder />

        {sampleTemplates?.data?.map((template: TemplateType) => (
          <TemplateItem
            template={template}
            editable={false}
            key={template.id}
          />
        ))}

        {myTemplates?.data?.map((template: TemplateType) => (
          <TemplateItem template={template} key={template.id} />
        ))}
      </div>
    </div>
  );
}
