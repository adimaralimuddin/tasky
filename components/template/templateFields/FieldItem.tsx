import React from "react";
import { FieldType } from "../../../features/card/CardType";
import { Trash } from "../../../lib/icons";

type FieldItemProps = { field: FieldType; set: any };
export default function FieldItem({ field, set }: FieldItemProps) {
  const onRemove = () => {
    set((p: FieldType[]) => p.filter((p) => p !== field));
  };

  const onUpdateText = (e: any) => {
    const text = e.target.value;
    set((p: FieldType[]) => p?.map((f) => (f == field ? { ...f, text } : f)));
  };

  const onUpdateType = (e: any) => {
    const type = e.target.value;
    set((p: FieldType[]) => p?.map((f) => (f == field ? { ...f, type } : f)));
  };

  return (
    <div className="ring-1 ring-slate-300 dark:ring-slate-500 shadow-sm p-1 flex items-center justify-between rounded-md my-2">
      <small className="flex-1 flex items-center gap-1 ">
        <input
          className="w-[95%] m-0 py-1 px-1 ring-1 ring-slate-200 dark:ring-slate-500 dark:bg-slate-600 "
          type="text"
          defaultValue={field?.text}
          onBlur={onUpdateText}
        />
        :
        <select
          className="dark:bg-slate-600 flex-1 ring-1 ring-slate-200 dark:ring-slate-500 m-0 py-1 px-1"
          defaultValue={field?.type}
          onChange={onUpdateType}
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
