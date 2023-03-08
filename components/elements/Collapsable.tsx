import React, { useEffect, useRef, useState } from "react";
interface Props {
  children: React.ReactNode;
  open: boolean;
  className?: string;
}
function Collapsable({ className = "", open, children }: Props) {
  const [close, setClose] = useState(false);
  useEffect(() => {
    if (open) {
      setClose(false);
    }
  }, [open]);

  if (close) return null;
  return (
    <div
      onAnimationEnd={() => {
        console.log(`end`);

        if (!open) {
          console.log(`close`);
          setClose(true);
        }
      }}
      className={
        "  transition-[max-height] overflow-hiddend " +
        (open
          ? " max-h-[150px] opacity-100 "
          : " max-h-0 opacity-40  overflow-hidden ") +
        className
      }
    >
      {children}
    </div>
  );
}

export default Collapsable;
