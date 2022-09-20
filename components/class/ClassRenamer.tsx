import React, { useState } from "react";
import useClass from "../../features/class/useClass";
import Box from "../elements/Box";
import BtnPrime from "../elements/BtnPrime";
import Input from "../elements/Input";
import Modal from "../elements/Modal";
import { ClassType } from "./classTypes";

export default function ClassRenamer({
  open,
  setOpen,
  data,
}: {
  open: any;
  setOpen: any;
  data: ClassType;
}) {
  const { renameClass } = useClass(data?.id);
  const [name, setName] = useState(data?.name);

  const onRenameHandler = () => {
    renameClass({ classId: data?.id, name });
    setOpen(false);
  };

  return (
    <div>
      <Modal open={open} setOpen={setOpen}>
        {(Icon: any) => (
          <Box>
            <Icon />
            <Input
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              value={name}
              defaultValue={data?.name}
            />
            <BtnPrime onClick={onRenameHandler}>rename</BtnPrime>
          </Box>
        )}
      </Modal>
    </div>
  );
}
