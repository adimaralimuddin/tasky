import React, { useState } from "react";
import Box from "../elements/Box";
import BtnPrime from "../elements/BtnPrime";
import Input from "../elements/Input";
import { FaPlus } from "react-icons/fa";
import Modal from "../elements/Modal";
import useClass from "../../hooks/useClassHooks";
import { useUser } from "@auth0/nextjs-auth0";
import { DEF_USER } from "../../lib/public";
import Loader from "../elements/Loader";

function ClassAdder() {
  const { user } = useUser();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");
  const { addClass, classAdder } = useClass();

  const onAddClassHandler = () => {
    addClass({
      userId: user?.sub || DEF_USER,
      name,
      description,
    });
    setOpen(false);
  };

  return (
    <div className="flex-1 min-w-[200px] max-w-[250px] cursor-pointer">
      <div
        onClick={(_) => setOpen(true)}
        className="ring-1d items-center flex-col flex min-h-[130px] justify-center gap-2"
      >
        <div className="bg-white dark:bg-slate-400 rounded-full shadow-md hover:scale-110 transition">
          <FaPlus className="text-indigo-400 dark:text-white text-3xl m-2   " />
        </div>
        <h3 className="text-slate-500 dark:text-slate-300">Create New Class</h3>
      </div>

      <Loader message="adding class ... " open={classAdder?.isLoading} />

      <Modal open={open} setOpen={setOpen}>
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
      </Modal>
    </div>
  );
}

export default ClassAdder;
