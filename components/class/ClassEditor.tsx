import { ClassType } from "./classTypes";
import React, { useState } from "react";
import Modal from "../elements/Modal";
import Box from "../elements/Box";
import Input from "../elements/Input";
import BtnPrime from "../elements/BtnPrime";
import BtnWarm from "../elements/BtnWarm";

type props = {
  open: boolean;
  setOpen: any;
  data: ClassType;
  onSave: any;
};

export default function ClassEditor({ open, setOpen, data, onSave }: props) {
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
        {(Icon: any) => (
          <Box>
            <Icon />
            <h3 className="text-indigo-400">Edit Class</h3>
            <div>
              <Input
                autoFocus
                defaultValue={name}
                value={name}
                text="name"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target?.value)
                }
              />
              <Input
                defaultValue={description}
                value={description}
                text="description"
                onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDescription(e.target?.value)
                }
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
