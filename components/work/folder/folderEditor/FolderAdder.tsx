// import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi";
import useFolderAdder from "../../../../features/folder/useFolderAdder";
import Box from "../../../elements/Box";
import BtnPrime from "../../../elements/BtnPrime";
import Input from "../../../elements/Input";
import Modal from "../../../elements/Modal";

// const Modal = dynamic

type props = {
  classId: string | any;
};

export default function FolderAdder({ classId }: props) {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    setFolderName("");
  }, []);

  const { addFolder } = useFolderAdder(classId);

  const onAddFolderHandler = () => {
    if (!folderName) return alert("you mast enter a folder name!");
    setOpen(false);
    addFolder(folderName);
  };

  return (
    <div className="flex flex-col">
      <BtnPrime css="flex items-center mx-3" onClick={() => setOpen(true)}>
        <HiOutlinePlus className="text-md " />
        <small className="whitespace-nowrap text-center">New Folder</small>
      </BtnPrime>
      <Modal open={open} setOpen={setOpen}>
        {(Icon: any) => (
          <Box css="w-full max-w-lg p-[3%]">
            <Icon />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onAddFolderHandler();
              }}
            >
              <Input
                autoFocus={true}
                onInput={(e: any) => setFolderName(e.target.value)}
              >
                name
              </Input>
              <button type="submit">Create Folder</button>
            </form>
          </Box>
        )}
      </Modal>
    </div>
  );
}
