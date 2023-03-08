// import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useFolderAdder from "../../../../features/folder/useFolderAdder";
import Input from "../../../elements/Input";
import Modal from "../../../elements/Modal";

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
    // setOpen(false);
    addFolder(folderName);
  };

  return (
    <div className="flex flex-col text-prime font-semibold">
      <h4 onClick={() => setOpen(true)} className="px-3 flex_ cursor-pointer ">
        <Image src="/icon/create_icon.svg" width={20} height={20} /> Create
        Folder
      </h4>

      <Modal open={open} setOpen={setOpen} className="max-w-md">
        {(closePop) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              closePop(() => {
                onAddFolderHandler();
              });
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
        )}
      </Modal>
    </div>
  );
}
