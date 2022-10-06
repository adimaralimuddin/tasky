import React, { useState } from "react";
import useClass from "../../features/class/useClass";
import Box from "../elements/Box";
import BtnPrime from "../elements/BtnPrime";
import Input from "../elements/Input";
import Loader from "../elements/Loader";
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
  const { renameClass, classRenamer } = useClass(data?.id);
  const [name, setName] = useState(data?.name);

  const onRenameHandler = () => {
    if (data?.sample) {
      alert(
        "sample class will not be renamed. it's there as sample only. you can always signin and create your own class."
      );
      return setName(data?.name);
    }
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
      <Loader message="renaming class ... " open={classRenamer?.isLoading} />
    </div>
  );
}
