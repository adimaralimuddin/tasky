import { useUser } from "@auth0/nextjs-auth0";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { ClassType } from "../../../features/class/classTypes";
import useClassAdder from "../../../features/class/useClassAdder";
import Input from "../../elements/Input";
import ClassAdderView from "./ClassAdderView";

const Modal = dynamic(() => import("../../elements/Modal"), {
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
        <Modal className="max-w-md" open={open} setOpen={setOpen}>
          {(closePop) => (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                closePop(() => {
                  onAddClassHandler();
                });
              }}
            >
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
          )}
        </Modal>
      )}
    </div>
  );
}

export default ClassAdder_;
