// import dynamic from "next/dynamic";
import Image from "next/image";
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
    <div className="flex flex-col text-prime font-semibold">
      <h4 onClick={() => setOpen(true)} className="px-3 flex_ cursor-pointer ">
        <Image src="/icon/create_icon.svg" width={20} height={20} /> Create
        Folder
      </h4>
      {/* <BtnPrime css="flex items-center mx-3" onClick={() => setOpen(true)}>
        <HiOutlinePlus className="text-md " />
        <small className="whitespace-nowrap text-center">New Folder</small>
      </BtnPrime> */}
      <Modal open={open} setOpen={setOpen}>
        {(Icon: any) => (
          <Box css="w-full max-w-lg p-[3%] animate-pop">
            <Icon />
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onAddFolderHandler();
              }}
            >
              <h3>Adding New Folder</h3>
              <Input
                col={true}
                autoFocus={true}
                onInput={(e: any) => setFolderName(e.target.value)}
              >
                name
              </Input>
              <button className="btn-prime" type="submit">
                Create Folder
              </button>
            </form>
          </Box>
        )}
      </Modal>
    </div>
  );
}
