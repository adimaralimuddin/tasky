import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useClassGetter from "../../../../features/class/useClassGetter";
import useFolderAdder from "../../../../features/folder/useFolderAdder";
import Input from "../../../elements/Input";
import Modal from "../../../elements/Modal";

type props = {};

export default function FolderAdder() {
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const { class_ } = useClassGetter();
  const { user } = useUser();
  const { addFolder } = useFolderAdder();

  useEffect(() => {
    setFolderName("");
  }, []);

  const onAddFolderHandler = () => {
    addFolder(folderName);
  };

  if (user?.sub !== class_?.userId && !class_?.sample) {
    return null;
  }

  return (
    <div className="flex flex-col text-prime font-semibold">
      <h4 onClick={() => setOpen(true)} className="px-3 flex_ cursor-pointer ">
        <Image
          src="/icon/create_icon.svg"
          width={20}
          height={20}
          alt="folder adder icon"
        />
        Add Folder
      </h4>

      <Modal open={open} setOpen={setOpen} className="max-w-md">
        {(closePop) => (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!folderName) return alert("you mast enter a folder name!");
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
