import React, { useState } from "react";

function Input({
  text,
  name,
  type = "text",
  htmlFor,
  inputClass,
  children,
  onChange_,
  onReset_,
  col = true,

  ...props
}: any) {
  const [val, setVal] = useState(props?.defaultValue);
  const [hasChanged, setHasChanged] = useState(false);
  return (
    <div
      style={{
        justifyContent: type === "checkbox" ? "center" : "",
        flexDirection: col ? "column" : "row",
      }}
      className={
        "dark:text-slate-300 flex  text-sm flex-1 my-2 relative  " + props?.css
      }
    >
      {hasChanged && onReset_ && (
        <p
          onClick={() => {
            setVal(onReset_?.());
            setHasChanged(false);
          }}
          title={props?.defaultValue && "" + props?.defaultValue}
          className="dark:bg-slate-500 rounded-md px-1 flex_ absolute -top-3 right-0 cursor-pointer hover:scale-[1.08] transition "
        >
          Reset
        </p>
      )}
      <label htmlFor={htmlFor} className="mx-2 whitespace-nowrap text-[1rem] ">
        {children || text}
      </label>
      {/* <input type="checkbox" className="flex- ml-auto m-0 -mr-2  ring-2" /> */}
      <input
        name={text || name}
        {...props}
        value={props?.value || val}
        onChange={(e) => {
          const val_ = e.target?.value;
          setVal(val_);
          onChange_?.(val_);
          setHasChanged(true);
          props?.onChange?.(e);
        }}
        style={{
          cursor: type === "checkbox" ? "pointer" : "text",
          marginLeft: "auto",
          flex: type == "checkbox" ? "0" : 1,
        }}
        type={type}
        className={"text-sec bg-sec w-full text-[1rem] flex-1 " + inputClass}
      />
    </div>
  );
}

export default Input;
