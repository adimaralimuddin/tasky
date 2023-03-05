import React, { useState } from "react";

interface Props {
  text: string;
  defaultValue?: boolean;
  className?: string;
  onToggle: (updatedValue: boolean) => any;
  wide?: boolean;
  value: boolean;
}
function Toggle({
  text,
  defaultValue = true,
  value,
  onToggle,
  className = "",
  wide = false,
}: Props) {
  const [val, setVal] = useState(defaultValue);

  const onToggleHandler = () => {
    setVal((p) => !p);
    onToggle?.(!val);
  };
  return (
    <div
      style={{ justifyContent: wide ? "space-between" : "" }}
      onClick={onToggleHandler}
      className={
        "flex_ gap-2 cursor-pointer select-none text-phar  	" + className
      }
    >
      <p className="text-[.9rem]">{text}</p>
      <div
        style={{
          justifyContent: value || val ? "end" : "start",
        }}
        className="bg-slate-200 dark:bg-layer-50 rounded-xl w-[35px] max-h-[10px]d flex p-[3px] "
      >
        <span
          className={
            "p-[7px] bg-primary-lightd rounded-full " +
            (value || val
              ? "bg-primary-light dark:bg-accent-dark "
              : " bg-slate-300 dark:bg-layer-sec ")
          }
        ></span>
      </div>
    </div>
  );
}

export default Toggle;
