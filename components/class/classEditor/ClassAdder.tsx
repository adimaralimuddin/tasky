import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import useClassAdder from "../../../features/class/useClassAdder";
import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import Input from "../../elements/Input";
import ClassAdderView from "./ClassAdderView";

const DynamicModal = dynamic(() => import("../../elements/Modal"), {
  ssr: false,
});

function ClassAdder_() {
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const { addClass, checkLimit } = useClassAdder();

  useEffect(() => {}, []);

  const onAddClassHandler = async () => {
    addClass({
      name,
      description,
    });
    setOpen(false);
  };
  return (
    <div onClick={() => setOpen(true)}>
      {checkLimit() ? (
        <ClassAdderView />
      ) : (
        <div>
          <p>Reached limit</p>
        </div>
      )}

      {checkLimit().toString()}
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

export default ClassAdder_;
