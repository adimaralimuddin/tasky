import React from "react";
import { ClassType } from "../../../features/class/classTypes";
import useClassDeleter from "../../../features/class/useClassDeleter";
import Verifier from "../../elements/Verifier";

interface Props {
  isDeleting: boolean;
  setIsDeleting: any;
  editable: boolean;
  setIsEditing: any;
  data: ClassType;
}
function ClassDeleter({
  isDeleting,
  setIsDeleting,
  setIsEditing,
  editable,
  data,
}: Props) {
  const { deleteClass } = useClassDeleter();

  const onDelete = () => {
    if (!editable) {
      return alert(
        "sample class will not be deleted. you can always login and create or delete your own class"
      );
    }
    deleteClass(data?.id);
    setIsEditing(false);
  };

  return (
    <div>
      <Verifier
        open={isDeleting}
        setOpen={setIsDeleting}
        message="folders and topics will also be permanently deleted"
        onOkay={onDelete}
      />
    </div>
  );
}

export default ClassDeleter;
