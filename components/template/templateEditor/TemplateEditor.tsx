import { useUser } from "@auth0/nextjs-auth0";
import React, { useState } from "react";
import { FieldType } from "../../../features/card/CardType";
import { ENTITY_LIMIT } from "../../../lib/public";
import BtnSec from "../../elements/BtnSec";
import Input from "../../elements/Input";
import Modal from "../../elements/Modal";
import FieldAdder from "../templateFields/FieldAdder";
import FieldItem from "../templateFields/FieldItem";

type props = {
  onSave: Function;
  fronts_?: any;
  backs_?: any;
  name_?: string;
  open: boolean;
  setOpen: any;
  onCancel?: any;
  title?: string;
};
export default function TemplateEditor({
  onSave,
  name_ = "",
  fronts_ = [],
  backs_ = [],
  open,
  setOpen,
  title = "Editing Template",
  onCancel,
}: props) {
  const { user } = useUser();
  const [name, setName] = useState(name_);
  const [fronts, setFronts] = useState(fronts_);
  const [backs, setBacks] = useState(backs_);

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
    <Modal className="max-w-4xl" open={open} setOpen={setOpen}>
      {(closePop) => (
        <>
          <div className="">
            <h2 className="text-prime">{title}</h2>
            <Input
              text="name"
              placeholder="ie. spanish template"
              defaultValue={name}
              onInput={(e: any) => setName(e.target.value)}
              autoFocus
              onReset_={() => name_}
            />
          </div>
          <div className="flex flex-wrap gap-2 ">
            <Fields fields={fronts} set={setFronts} text="Fronts" />
            <Fields fields={backs} set={setBacks} text="Backs" />
          </div>
          <footer className="flex items-center justify-between py-2">
            <button
              className="btn-prime"
              onClick={() => {
                closePop(() => {
                  onSaveTemplate();
                });
              }}
            >
              save
            </button>
            <button className="btn-sec" onClick={resetData}>
              reset
            </button>
          </footer>
        </>
      )}
    </Modal>
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
    <div className="flex-1 rounded-md  card-ring dark:ring-layer-sec ">
      <p className="p-1 px-2">{text}</p>
      <div className="flex flex-col max-h-[60vh] overflow-auto p-3">
        {fields?.map((field: FieldType) => (
          <FieldItem
            field={field}
            set={set}
            key={"front-" + field.text + field.ind}
          />
        ))}
        {fields?.length < ENTITY_LIMIT ? (
          <FieldAdder list={fields} set={set} />
        ) : (
          <div className="col_ gap-0">
            <small className="text-warm">reached maximum fields!</small>
            <small className="text-sec">
              you can add up to five fields only.
            </small>
          </div>
        )}
      </div>
    </div>
  );
}
