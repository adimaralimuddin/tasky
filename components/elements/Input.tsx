import React from "react";

function Input({
  text,
  name,
  type = "text",
  htmlFor,
  inputClass,
  children,

  ...props
}: any) {
  return (
    <div
      className={
        "dark:text-slate-300 flex  flex-1 my-2 " +
        (type == "checkbox" ? "" : " flex-col ") +
        props?.css
      }
    >
      <label htmlFor={htmlFor} className="mx-2 whitespace-nowrap ">
        {children || text}
      </label>
      <input
        {...props}
        type={type}
        name={text || name}
        className={
          "bg-slate-100 dark:bg-slate-600 flex-1 min-w-[50px] w-[95%] " +
          inputClass
        }
      />
    </div>
  );
}

export default Input;
