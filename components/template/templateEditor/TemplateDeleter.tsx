import React from "react";
import useTemplateDeleter from "../../../features/template/useTemplateDeleter";
import Verifier from "../../elements/Verifier";

interface Props {
  isDeleting: boolean;
  setIsDeleting: any;
  editable: boolean;
  templateId: string | undefined;
  setOpen: any;
}
function TemplateDeleter({
  isDeleting,
  setIsDeleting,
  editable,
  templateId,
  setOpen,
}: Props) {
  const { deleteTemplate } = useTemplateDeleter();

  const onDeleteHandler = () => {
    if (!editable) {
      return alert(
        "sample template will not be deleted. you can always login and create or delete your own template."
      );
    }
    deleteTemplate(templateId);
    setOpen(false);
  };

  return (
    <Verifier
      message="are you sure to delete this template?"
      open={isDeleting}
      setOpen={setIsDeleting}
      onOkay={onDeleteHandler}
    />
  );
}

export default TemplateDeleter;
