import { useUser } from "@auth0/nextjs-auth0";
import React from "react";
import { FieldType } from "../../../features/card/CardType";
import { TemplateType } from "../../../features/template/templateType";
import useTemplateUpdater from "../../../features/template/useTemplateUpdater";
import TemplateEditor from "./TemplateEditor";

interface Props {
  template: TemplateType;
  openEditor: boolean;
  setOpenEditor: any;
  setOpen: any;
  editable: boolean;
}
function TemplateUpdater({
  template,
  openEditor,
  setOpenEditor,
  setOpen,
  editable,
}: Props) {
  const { user } = useUser();
  const { updateTemplate } = useTemplateUpdater(user?.sub);

  const onSaveHandler = (data: any) => {
    if (!editable) {
      return alert(
        "sample template will not be edited. you can always login and create or edit your own template."
      );
    }

    updateTemplate({ ...data, id: template?.id });
    setOpen(true);
  };
  return (
    <TemplateEditor
      name_={template?.name}
      open={openEditor}
      setOpen={setOpenEditor}
      fronts_={toJson(template?.fronts as any)} // adimar
      backs_={toJson(template?.backs as any)}
      onSave={onSaveHandler}
      onCancel={() => {
        setOpen(true);
        setOpenEditor(false);
      }}
    />
  );
}

const toJson = (fields: string) =>
  typeof fields === "string"
    ? JSON.parse(fields)?.map((p: FieldType, ind: number) => ({ ...p }))
    : fields;

export default TemplateUpdater;
