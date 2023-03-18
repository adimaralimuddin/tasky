import React, { useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: any;
  className?: string;
  header: React.ReactNode;
  pin?: boolean;
  right?: boolean;
}
function Popy({
  open,
  setOpen,
  children,
  className,
  header,
  pin,
  right: right_,
}: Props) {
  const [done, setDone] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);
  const [right, setRight] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (!popRef.current?.contains(e.target)) {
        popRef.current?.classList.add("pop-out");
        setDone(true);
      } else {
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <div className="">
      <div
        onClick={(e) => {
          if (!open) {
            if (pin) setTop(e.clientY);
            if (right_) setRight(e.nativeEvent.offsetX);
            setOpen(true);
            setDone(false);
          } else {
            setOpen(false);
            popRef.current?.classList.add("pop-out");
            setDone(true);
          }
        }}
      >
        {header && header}
      </div>

      {open && (
        <div
          onAnimationEnd={(e) => {
            if (done) {
              setOpen(false);
              setDone(false);
            }
          }}
          ref={popRef}
          style={{
            top: (pin && top && top + 5) || "",
            right: (right_ && right && right + 5) || "",
          }}
          className={"z-50 fixed animate-pop mt-2  " + className}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default Popy;
