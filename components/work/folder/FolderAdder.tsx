import React, { useState } from "react";
import useFolder from "../../../features/folder/useFolder";
import { Plus } from "../../../lib/icons";
import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import Input from "../../elements/Input";
import Loader from "../../elements/Loader";
import Modal from "../../elements/Modal";
import Verifier from "../../elements/Verifier";

type props = {
  classId: string | any;
};

export default function FolderAdder({ classId }: props) {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  const {
    addFolder,
    folderAdder: { isLoading },
  } = useFolder(classId);

  const onAddFolderHandler = () => {
    setOpen(false);
    addFolder(folderName);
  };

  return (
    <div className="flex flex-col">
      <BtnPrime css="max-w-[130px] mx-auto m-3 " onClick={() => setOpen(true)}>
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
      <Loader message="adding folder ..." open={isLoading} />
    </div>
  );
}
