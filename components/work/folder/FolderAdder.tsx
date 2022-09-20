import React, { useState } from "react";
import useFolder from "../../../features/folder/useFolder";
import { Plus } from "../../../lib/icons";
import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import Input from "../../elements/Input";
import Modal from "../../elements/Modal";

type props = {
  classId: string;
};

export default function FolderAdder({ classId }: props) {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { addFolder } = useFolder(classId);

  const onAddFolderHandler = () => {
    addFolder(folderName);
    setOpen(false);
  };

  return (
    <div className="flex flex-col">
      <BtnPrime css="max-w-[130px] mx-auto m-3 " onClick={(_) => setOpen(true)}>
        <Plus className="text-lg" />
        <small className="whitespace-nowrap">New Folder</small>
      </BtnPrime>
      <Modal open={open} setOpen={setOpen}>
        {(Icon: any) => (
          <Box css="w-full max-w-lg p-[3%]">
            <Icon />
            <Input onInput={(e: any) => setFolderName(e.target.value)}>
              name
            </Input>
            <BtnPrime onClick={onAddFolderHandler}>Create Folder</BtnPrime>
          </Box>
        )}
      </Modal>
    </div>
  );
}
