import React from "react";
import useTemplateDeleter from "../../../features/template/useTemplateDeleter";
import Verifier from "../../elements/Verifier";

interface Props {
  isDeleting: boolean;
  setIsDeleting: any;
  editable: boolean;
  templateId: string | undefined;
}
function TemplateDeleter({
  isDeleting,
  setIsDeleting,
  editable,
  templateId,
}: Props) {
  const { deleteTemplate } = useTemplateDeleter();

  const onDeleteHandler = () => {
    if (!editable) {
      return alert(
        "sample template will not be deleted. you can always login and create or delete your own template."
      );
    }
    deleteTemplate(templateId);
  };

  return (
    <div>
      <Verifier
        message="are you sure to delete this template?"
        open={isDeleting}
        setOpen={setIsDeleting}
        onOkay={onDeleteHandler}
      />
    </div>
  );
}

export default TemplateDeleter;
