import React, { useState } from "react";

export default function FieldAdder({ set }: any) {
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
          className="ring-1 dark:ring-indigo-500 dark:bg-indigo-400 px-2 rounded-md cursor-pointer dark:text-white"
        >
          + field
        </p>
      )}
      {clicked && (
        <div className="gap-2 flex-1 flex flex-col  ring-1 ring-slate-200 dark:ring-slate-600  rounded-md p-2 shadow-md ">
          <span className=" flex flex-col flex-1">
            <small>text:</small>
            <input
              type="text flex-1"
              className=" p-1 px-3 outline-none min-w-[150px] ring-1d flex-1 w-full"
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
          <button
            onClick={onSave}
            className="ring-1 p-0 m-0 px-2 dark:bg-indigo-400 dark:ring-indigo-500 dark:text-white "
          >
            add
          </button>
        </div>
      )}
    </div>
  );
}
