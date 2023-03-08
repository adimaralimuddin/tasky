import React, { useEffect, useState } from "react";
import _useGraphCount from "../../lib/utils/_useGraphCount";

interface Props {
  value: number;
  size?: number;
  bar?: number;
  fontSize?: number | string;
  fontWeight?: number | string;
  bar_d?: any;
  bar_l?: any;
}
function Pie({
  value = 46,
  size = 57,
  bar = 7,
  fontSize = "0.9rem",
  fontWeight = 800,
  bar_d = "#bc81fa",
  // bar_d = "rgb(52, 225, 225)d",
  bar_l = "#7756AC",
}: Props) {
  const { counter } = _useGraphCount(value);

  return (
    <div
      className="box flex items-center justify-center transition "
      style={
        {
          ["--p"]: `${counter === 0 ? 0.5 : counter}`,
          "--bar-d": bar_d,
          "--bar-l": bar_l,
          width: size,
          height: size,
          padding: bar,
        } as any
      }
    >
      <p
        style={{
          fontSize,
          fontWeight,
        }}
        className={` dark:text-[rgb(52, 225, 225)]  flex-1 bg-red-500d h-full w-full flex items-center justify-center  `}
      >
        {(!isNaN(counter) && counter) || 0}%
      </p>
    </div>
  );
}

export default Pie;
