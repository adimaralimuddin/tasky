import dynamic from "next/dynamic";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import useClassAdder from "../../../features/class/useClassAdder";
import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import Input from "../../elements/Input";
const DynamicModal = dynamic(() => import("../../elements/Modal"), {
  ssr: false,
});

interface Props {
  //   name: string;
  //   description: string;
  //   open?: boolean;
}
function classAdderDynamic({}: Props) {
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const { addClass } = useClassAdder();
  const onAddClassHandler = async () => {
    addClass({
      name,
      description,
    });
    // setOpen(false);
  };
  return (
    <div>
      <FaPlus />
      {open && (
        <DynamicModal open={open} setOpen={setOpen}>
          {(Icon: any) => (
            <div className="px-5 w-full">
              <Box css="w-fulld max-w-[400px] mx-auto">
                <Icon />
                <Input
                  onInput={(e: any) => setName(e.target.value)}
                  css="flex-col"
                >
                  Name
                </Input>
                <Input
                  onInput={(e: any) => setDesc(e.target.value)}
                  css="flex-col"
                >
                  Description
                </Input>
                <BtnPrime onClick={onAddClassHandler}>Create</BtnPrime>
              </Box>
            </div>
          )}
        </DynamicModal>
      )}
    </div>
  );
}

export default classAdderDynamic;
