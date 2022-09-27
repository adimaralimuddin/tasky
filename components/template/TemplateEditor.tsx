import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { FieldType } from "../../features/card/CardType";
import Box from "../elements/Box";
import BtnPrime from "../elements/BtnPrime";
import BtnSec from "../elements/BtnSec";
import Input from "../elements/Input";
import Modal from "../elements/Modal";
import FieldAdder from "./FieldAdder";
import FieldItem from "./FieldItem";

type props = {
  onSave: Function;
  fronts_?: any;
  backs_?: any;
  name_?: string;
  open: boolean;
  setOpen: any;
  onCancel?: any;
};
export default function TemplateEditor({
  onSave,
  name_ = "",
  fronts_ = [],
  backs_ = [],
  open,
  setOpen,
  onCancel,
}: props) {
  const { user } = useUser();
  const [name, setName] = useState(name_);
  const [fronts, setFronts] = useState(fronts_);
  const [backs, setBacks] = useState(backs_);

  // useEffect(() => {
  //   resetData();
  // }, [open]);

  const onSaveTemplate = () => {
    if (name.trim() == "") {
      return alert("template must have a name and fields");
    }
    const data = { name, fronts, backs, userId: user?.sub };
    onSave(data);
    setOpen(false);
  };

  const resetData = () => {
    setFronts(fronts_);
    setBacks(backs_);
    setName(name_);
  };

  return (
    <div>
      <Modal open={open} setOpen={setOpen}>
        {(Icon: any) => (
          <Box css="w-full max-w-xl max-h-[93vh]">
            <Icon onClick={onCancel} />
            <div>
              <Input
                text="name"
                placeholder="ie. spanish template"
                value={name}
                onInput={(e: any) => setName(e.target.value)}
                autoFocus
              />
            </div>
            <div className="flex flex-wrap gap-2 ">
              <Fields fields={fronts} set={setFronts} text="Fronts" />
              <Fields fields={backs} set={setBacks} text="Backs" />
            </div>
            <footer className="flex items-center justify-between py-2">
              <BtnPrime onClick={onSaveTemplate}>save</BtnPrime>
              <BtnSec onClick={resetData}>reset</BtnSec>
            </footer>
          </Box>
        )}
      </Modal>
    </div>
  );
}

function Fields({
  fields,
  set,
  text,
}: {
  fields: FieldType[];
  set: any;
  text: string;
}) {
  return (
    <div className="flex-1 ring-1 ring-slate-200 rounded-md dark:ring-slate-600 overflow-autod ">
      <p className="p-1 px-2">{text}</p>
      <div className="flex flex-col max-h-[60vh] overflow-auto p-3">
        {fields?.map((field: FieldType) => (
          <FieldItem
            field={field}
            set={set}
            key={"front-" + field.text + field.ind}
          />
        ))}
        <FieldAdder list={fields} set={set} />
      </div>
    </div>
  );
}
