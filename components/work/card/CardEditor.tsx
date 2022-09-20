import React, { useState } from "react";
import { CardTypes, FieldType } from "../../../features/card/CardType";
import useField from "../../../features/field/useField";
import useWork from "../../../features/work/useWork";
import { ImageIcon, Mp3, RefreshIcon } from "../../../lib/icons";
import Box from "../../elements/Box";
import BtnSec from "../../elements/BtnSec";
import BtnWarm from "../../elements/BtnWarm";
import ImageItem from "../../elements/ImageItem";
import Input from "../../elements/Input";
import Modal from "../../elements/Modal";

type props = {
  card: CardTypes;
  onCancel: any;
  open: boolean;
  setOpen: any;
  onUpdated: any;
};

export default function CardEditor({
  open,
  card,
  onCancel,
  setOpen,
  onUpdated,
}: props) {
  if (!open) return null;

  const { work } = useWork();
  const [fronts, setFronts] = useState(card?.fronts);
  const [backs, setBacks] = useState(card?.backs);
  const { updateFields } = useField();
  const [isUpdating, setIsUpdating] = useState(false);

  const onUpdateHandler = async () => {
    setIsUpdating(true);
    const data = {
      fronts,
      backs,
      topicId: work?.selectedTopic?.id,
      cardId: card?.id,
    };
    const ret = await updateFields(data);
    onUpdated?.(ret);
    setOpen(false);
    setIsUpdating(false);
  };

  return (
    <div>
      <Modal open={open && !isUpdating}>
        {() => (
          <Box css="flex-1 flex flex-col overflow-auto">
            <h3 className="px-2">Editing card</h3>
            <div className="p-2 flex flex-wrap gap-3">
              <Fields fields={card?.fronts} setter={setFronts} />
              <Fields fields={card?.backs} setter={setBacks} text="Backs" />
            </div>
            <div className="flex items-center justify-between px-2 p-1">
              <BtnSec onClick={onUpdateHandler}>save card</BtnSec>
              <BtnWarm onClick={onCancel}>cancel</BtnWarm>
            </div>
          </Box>
        )}
      </Modal>
      <Modal open={isUpdating}>
        {() => (
          <Box css="p-4 shadow-md flex items-center gap-3 text-indigo-400">
            <h2 className=" animate-pulse  font-bold">Updating</h2>
            <RefreshIcon className="animate-spin text-2xl" />
          </Box>
        )}
      </Modal>
    </div>
  );
}

function Fields({
  fields,
  setter,
  text = "Fronts",
}: {
  fields?: FieldType[];
  setter?: any;
  text: string;
}) {
  return (
    <div className="flex-1 ring-1 ring-slate-200 rounded-xl p-2">
      <h2 className="mx-2 text-indigo-400 font-bold">{text}</h2>
      <div>
        {fields
          ?.sort((a, b) => a?.ind - b?.ind)
          ?.map((field) =>
            field?.type == "text" || field?.type == "number" ? (
              <FieldEditor data={field} setter={setter} />
            ) : (
              <FieldFileEditor data={field} setter={setter} />
            )
          )}
      </div>
    </div>
  );
}

function FieldEditor({ data, setter }: { data: FieldType; setter: any }) {
  const onInputHandler = (e) => {
    const value = e.target.value;
    setter((p: FieldType[]) => {
      const n = p?.map((f) => {
        if (f.id == data?.id) {
          return { ...f, newValue: value };
        }
        return f;
      });
      return n;
    });
  };
  return (
    <div className="pr-2">
      <Input
        onInput={onInputHandler}
        text={data?.text}
        type={data?.type || "text"}
        defaultValue={data?.value}
      />
    </div>
  );
}

function FieldFileEditor({ data, setter }: { data: FieldType; setter: any }) {
  const [src, setSrc] = useState(data?.value);
  const [file, setFile] = useState(null);

  // console.log("file data ", data);

  const onFileInputHandler = (e) => {
    const file = e.target?.files?.[0];
    if (!file) return console.log("no file ", e.target);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (!result) return console.log("no result ", e.target);
      setSrc(result);
    };
    reader.readAsDataURL(e.target.files?.[0]);
    setFile(file);
    onSetHandler(file);
  };

  const onSetHandler = (file) => {
    setter((p: FieldType[]) => {
      const n = p?.map((f) => {
        if (f?.id == data?.id) {
          return { ...f, newValue: file };
        }
        return f;
      });
      return n;
    });
  };

  const onResetHandler = () => {
    setSrc(data?.value);
    setFile(null);
  };

  return (
    <div className="px-1 flex flex-col gap-2 ">
      <div className="flexd items-center gap-2">
        <p>{data?.text}</p>
        <div className="flex items-center gap-2 my-1">
          {data?.type == "audio" ? <Mp3 /> : <ImageIcon />}
          <label
            className="ring-1 px-1 rounded-md ring-slate-300 cursor-pointer"
            htmlFor={data?.id + "input"}
          >
            Change
          </label>
          <p
            onClick={onResetHandler}
            className="flex gap-1 items-center ring-1 px-1 rounded-md ring-slate-300 cursor-pointer"
          >
            <RefreshIcon />
            reset
          </p>
        </div>
        <input
          id={data?.id + "input"}
          type="file"
          accept={data?.type == "image" ? "images/*" : "audio/*"}
          className="hidden"
          onInput={onFileInputHandler}
        />
      </div>
      <small>{file?.name}</small>
      {data?.type == "image" ? (
        <ImageItem src={src} />
      ) : (
        <audio src={src} controls />
      )}
    </div>
  );
}
