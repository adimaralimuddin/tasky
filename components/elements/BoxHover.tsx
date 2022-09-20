import React from "react";
import Box from "./Box";

export default function BoxHover({ children, ...props }: any) {
  return (
    <Box
      {...props}
      css={
        " hover:-translate-y-[2px] hover:shadow-lg transition duration-100 cursor-pointer " +
        props?.css
      }
    >
      {children}
    </Box>
  );
}
