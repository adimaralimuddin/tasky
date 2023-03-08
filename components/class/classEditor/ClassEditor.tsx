import React, { useState } from "react";
import { ClassType } from "../../../features/class/classTypes";
import useClassUpdater from "../../../features/class/useClassUpdater";
import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import BtnWarm from "../../elements/BtnWarm";
import Input from "../../elements/Input";
import Modal from "../../elements/Modal";

type props = {
  open: boolean;
  setOpen: any;
  data: ClassType;
  setIsEditing: any;
  editable: boolean;
};

export default function ClassEditor({
  open,
  setOpen,
  data,
  setIsEditing,
  editable,
}: props) {
  const [name, setName] = useState(data.name);
  const [description, setDescription] = useState(data?.description);
  const { updateClass } = useClassUpdater();

  const onResetHandler = () => {
    setName(data?.name);
    setDescription(data?.description);
  };

  const onSaveHandler = () => {
    if (!editable) {
      return alert(
        "sample class will not be edited. you can always login and create or delete your own class"
      );
    }
    const data_ = {
      classId: data.id,
      name: name || "",
      description: description || data.description || "",
    };
    updateClass(data_);
    setIsEditing(false);
  };

  return (
    <Modal className="max-w-lg" open={open} setOpen={setOpen}>
      {(closePop) => (
        <>
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
            <button
              className="btn-prime"
              type="submit"
              onClick={() => {
                closePop(() => {
                  onSaveHandler();
                });
              }}
            >
              save
            </button>
            <BtnWarm onClick={() => setOpen(false)}>cancel</BtnWarm>
          </div>
        </>
      )}
    </Modal>
  );
}
