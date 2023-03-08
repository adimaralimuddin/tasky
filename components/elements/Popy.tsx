import React, { MouseEvent, useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: any;
  className?: string;
  header: React.ReactNode;
  pin?: boolean;
}
function Popy({ open, setOpen, children, className, header, pin }: Props) {
  //   const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);
  const [top, setTop] = useState<number | null>(null);

  useEffect(() => {
    const handler = (e: any) => {
      if (!popRef.current?.contains(e.target)) {
        popRef.current?.classList.add("pop-out");
        setDone(true);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  return (
    <div className="z-[200]">
      <div
        onClick={(e) => {
          if (!open) {
            if (pin) setTop(e.clientY);
            setOpen(true);
            setDone(false);
          } else {
            // setOpen(false);
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
