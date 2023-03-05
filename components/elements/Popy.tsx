import React, { MouseEvent, useEffect, useRef, useState } from "react";

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: any;
  className?: string;
  header: React.ReactNode;
}
function Popy({ open, setOpen, children, className, header }: Props) {
  //   const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

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
    <div>
      <div
        onClick={() => {
          console.log(`click`, open);

          if (!open) {
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
          className={" absolute animate-pop " + className}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export default Popy;
