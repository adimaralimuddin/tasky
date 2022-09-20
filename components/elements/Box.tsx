import React from "react";

function Box({ css, ...props }: any) {
  return (
    <div className={"p-3 m-1 bg-white shadow-sm rounded-xl  " + css} {...props}>
      {props?.children}
    </div>
  );
}

export default Box;
