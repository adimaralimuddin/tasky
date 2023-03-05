import { useUser } from "@auth0/nextjs-auth0";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { ClassType } from "../../../features/class/classTypes";
import useClassAdder from "../../../features/class/useClassAdder";
import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import Input from "../../elements/Input";
import ClassAdderView from "./ClassAdderView";

const DynamicModal = dynamic(() => import("../../elements/Modal"), {
  ssr: false,
});

function ClassAdder_({ myClasses }: { myClasses: ClassType[] }) {
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const [open, setOpen] = useState(false);
  const { addClass } = useClassAdder();
  const { user } = useUser();

  const checkLimit = () => {
    return myClasses?.length >= 5 ? true : false;
  };

  useEffect(() => {}, []);

  const onAddClassHandler = async () => {
    addClass({
      name,
      description,
    });
    setOpen(false);
  };

  if (!user) return null;
  return (
    <div onClick={() => setOpen(true)}>
      {!checkLimit() ? (
        <ClassAdderView />
      ) : (
        <div>
          <p>you have reach the limit</p>
          <h3 className="text-accent">0 class left!</h3>
        </div>
      )}

      {open && (
        <DynamicModal open={open} setOpen={setOpen}>
          {(Icon: any) => (
            <div className="px-5 w-full">
              <Box css="w-fulld max-w-[400px] mx-auto">
                <Icon />
                <form onSubmit={onAddClassHandler}>
                  <Input
                    autoFocus={true}
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
                  <button className="btn-prime" type="submit">
                    Create
                  </button>
                </form>
              </Box>
            </div>
          )}
        </DynamicModal>
      )}
    </div>
  );
}

export default ClassAdder_;
