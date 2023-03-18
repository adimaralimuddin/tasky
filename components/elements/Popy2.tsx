import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { setTimeout } from "timers";

interface Props {
  children: React.ReactNode;
  open: boolean;
  setOpen: any;
  className?: string;
  header: React.ReactNode;
  pin?: boolean;
  right?: boolean;
}
function Popy2({
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
  let timer: any;

  return (
    <div className="z-[200]">
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
          <span className="relative ">
            <input
              className="absolute top-0 left-0"
              style={{ maxHeight: 0, maxWidth: 0, padding: 0 }}
              onBlur={() => {
                timer = setTimeout(() => {
                  popRef.current?.classList.add("pop-out");
                  setDone(true);
                  if (timer) {
                    clearTimeout(timer);
                  }
                }, 120);
              }}
              type="text"
              autoFocus={true}
            />
          </span>
          {children}
        </div>
      )}
    </div>
  );
}

export default Popy2;
