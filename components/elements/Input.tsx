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
        "dark:text-slate-300 flex  text-sm flex-1 my-2 " +
        (type == "checkbox" ? " items-center " : " flex-col ") +
        props?.css
      }
    >
      <label htmlFor={htmlFor} className="mx-2 flex-1  whitespace-nowrap ">
        {children || text}
      </label>
      <input
        name={text || name}
        {...props}
        type={type}
        className={
          "bg-slate-100 dark:bg-slate-600 flex-1 min-w-[50px] w-[95%] " +
          inputClass
        }
      />
    </div>
  );
}

export default Input;
