import { useUser } from "@auth0/nextjs-auth0";
import React, { useEffect, useState } from "react";
import { FieldType } from "../../features/card/CardType";
import { Trash } from "../../lib/icons";
import Box from "../elements/Box";
import BtnPrime from "../elements/BtnPrime";
import BtnSec from "../elements/BtnSec";
import Input from "../elements/Input";
import Modal from "../elements/Modal";

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
          <Box css="w-full max-w-xl">
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
              <div className="flex-1 ring-1 p-2 ring-slate-200 rounded-md">
                <p>Fronts</p>
                {fronts?.map((field: FieldType) => (
                  <FieldItem
                    field={field}
                    set={setFronts}
                    key={"front-" + field.text + field.ind}
                  />
                ))}
                <FieldAdder list={fronts} set={setFronts} />
              </div>
              <div className="flex-1 ring-1 p-2 ring-slate-200 rounded-md">
                <p>Backs</p>
                {backs?.map((field: FieldType) => (
                  <FieldItem
                    field={field}
                    set={setBacks}
                    key={"back-" + field.text + field.ind}
                  />
                ))}
                <FieldAdder list={backs} set={setBacks} />
              </div>
            </div>
            <footer className="flex items-center justify-between">
              <BtnPrime onClick={onSaveTemplate}>save</BtnPrime>
              <BtnSec onClick={resetData}>reset</BtnSec>
            </footer>
          </Box>
        )}
      </Modal>
    </div>
  );
}

function FieldItem({ field, set }: { field: FieldType; set: any }) {
  const onRemove = () => {
    set((p: FieldType[]) => p.filter((p) => p !== field));
  };

  const onTextInputHandler: any = (e: React.ChangeEvent<HTMLFormElement>) => {
    const text = e.target.value;
    set((p: FieldType[]) => p?.map((f) => (f == field ? { ...f, text } : f)));
  };
  const onTypeInputHandler: any = (e: React.ChangeEvent<HTMLFormElement>) => {
    const type = e.target.value;
    set((p: FieldType[]) => p?.map((f) => (f == field ? { ...f, type } : f)));
  };

  return (
    <div className="ring-1 ring-slate-300 shadow-sm p-1 flex items-center justify-between rounded-md my-2">
      <small className="flex-1 flex items-center gap-1 ">
        <input
          className="w-[95%] m-0 py-1 px-1 ring-1 ring-slate-200"
          type="text"
          value={field?.text}
          onInput={onTextInputHandler}
        />
        :
        <select
          className="flex-1 ring-1 ring-slate-200 m-0 py-1 px-1"
          value={field?.type}
          onInput={onTypeInputHandler}
        >
          <option value="text">text</option>
          <option value="number">number</option>
          <option value="image">image</option>
          <option value="audio">audio</option>
        </select>
      </small>
      <button
        onClick={onRemove}
        className="ring-1d hover:shadow-lg hover:ring-1 ring-slate-200 p-1 m-0"
      >
        <Trash className="text-xl" />
      </button>
    </div>
  );
}

function FieldAdder({ list, set }: any) {
  const [clicked, setClicked] = useState(false);
  const [text, setText] = useState("");
  const [type, setType] = useState<any>("text");

  const onSave = () => {
    const data = { text, type };
    if (text.trim() === "") {
      return alert("must have a text");
    }
    if (type.trim() === "") {
      return alert("must have a type");
    }
    console.log(data);
    set((p = []) => [...p, data]);
    setClicked(false);
    setText("");
    setType("text");
  };

  return (
    <div className="my-2 flex flex-cold">
      {!clicked && (
        <p
          onClick={() => setClicked(true)}
          className="ring-1 px-2 rounded-md cursor-pointer"
        >
          + field
        </p>
      )}
      {clicked && (
        <div className="gap-2 flex-1 flex flex-col  ring-1 ring-slate-100 rounded-md p-2 shadow-md ">
          <span className=" flex flex-col flex-1">
            <small>text:</small>
            <input
              type="text flex-1"
              className=" p-0 px-2 m-0 rounded-none outline-none min-w-[150px] ring-1d flex-1 w-full"
              autoFocus
              placeholder="ie: in spanish"
              onInput={(e: React.ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
              onKeyUp={(e) => {
                if (e.code === "Enter") {
                  onSave();
                }
              }}
            />
          </span>
          <span className="flex flex-col ">
            <small>type :</small>
            <select
              defaultValue={"text"}
              onInput={(e: React.ChangeEvent<HTMLSelectElement>) =>
                setType(e.target.value)
              }
              className="min-w-[50px]"
            >
              <option value="text">text</option>
              <option value="number">number</option>
              <option value="image">image</option>
              <option value="audio">audio</option>
            </select>
          </span>
          <button onClick={onSave} className="ring-1 p-0 m-0 px-2">
            add
          </button>
        </div>
      )}
    </div>
  );
}
