import Link from "next/link";
import React, { useState } from "react";
import useClass from "../../features/class/useClass";
import Box from "../elements/Box";
import BtnPrime from "../elements/BtnPrime";
import BtnWarm from "../elements/BtnWarm";
import Input from "../elements/Input";
import Modal from "../elements/Modal";
import Option from "../elements/Option";
import Verifier from "../elements/Verifier";
import { ClassType } from "./classTypes";

function ClassItem({ data }: { data: ClassType; key?: any }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { deleteClass, updateClass } = useClass(data?.id);
  const options = [
    {
      text: "edit",
      action: () => setIsEditing(true),
    },
    {
      text: "delete",
      action: () => setIsDeleting(true),
    },
  ];

  const onSave = async (data) => {
    updateClass(data);
    setIsEditing(false);
  };

  const onDelete = () => {
    deleteClass(data.id);
    setIsEditing(false);
  };

  return (
    <Box
      css={
        "flex-1  min-w-[160px] max-w-[280px]     transition flex flex-col min-h-[130px]  "
      }
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <ClassEditor
        onSave={onSave}
        open={isEditing}
        setOpen={setIsEditing}
        data={data}
      />

      {hovered && (
        <span className="relative">
          <div className="absolute top-0 right-0">
            <Option options={options} left={true} />
          </div>
        </span>
      )}

      <Link href={`/class/${data?.id}`}>
        <div className="flex-1 flex flex-col cursor-pointer hover:font-boldd text-center justify-center">
          <h2 className="text-indigo-400 text-xl">{data?.name}</h2>
          <p className="text-slate-400 text-sm">{data?.description}</p>
        </div>
      </Link>

      <Verifier
        open={isDeleting}
        setOpen={setIsDeleting}
        message="folders and topics will also be permanently deleted"
        onOkay={onDelete}
      />
    </Box>
  );
}

export default ClassItem;

type props = {
  open: boolean;
  setOpen: any;
  data: ClassType;
  onSave: any;
};
function ClassEditor({ open, setOpen, data, onSave }: props) {
  const [name, setName] = useState(data?.name);
  const [description, setDescription] = useState(data?.description);

  const onResetHandler = () => {
    setName(data?.name);
    setDescription(data?.description);
  };

  const onSaveHandler = () => {
    onSave({ classId: data.id, name, description });
  };

  return (
    <div>
      <Modal open={open} setOpen={setOpen}>
        {(Icon) => (
          <Box>
            <Icon />
            <h3 className="text-indigo-400">Edit Class</h3>
            <div>
              <Input
                autoFocus
                defaultValue={name}
                value={name}
                text="name"
                onInput={(e) => setName(e.target?.value)}
              />
              <Input
                defaultValue={description}
                value={description}
                text="description"
                onInput={(e) => setDescription(e.target?.value)}
              />
              <button onClick={onResetHandler}>reset</button>
            </div>
            <div className="flex items-center justify-between">
              <BtnPrime onClick={onSaveHandler}>save</BtnPrime>
              <BtnWarm onClick={() => setOpen(false)}>cancel</BtnWarm>
            </div>
          </Box>
        )}
      </Modal>
    </div>
  );
}
