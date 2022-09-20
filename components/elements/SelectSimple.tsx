import React from "react";

type propTypes = {
  onInput: any;
  defaultValue?: any;
  children: any;
  text: string;
  css?: string;
  value?: string;
};

export default function SelectSimple({
  onInput,
  defaultValue,
  children,
  text,
  css,
  value,
  ...props
}: propTypes) {
  return (
    <span>
      <label className="whitespace-nowrap" htmlFor={text}>
        {text}
      </label>
      <select
        {...props}
        defaultValue={defaultValue}
        onInput={onInput}
        value={value}
        className={
          "ring-1 py-1 ring-slate-200 text-slate-500 bg-slate-50 " + css
        }
      >
        {children}
      </select>
    </span>
  );
}
