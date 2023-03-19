import { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";

type ClosePopType = (cb?: (open?: boolean, done?: boolean) => any) => any;
interface Props {
  children: (closePop: ClosePopType) => any;
  open: boolean;
  setOpen: any;
  css?: string;
  className?: string;
}

export default function Modal({
  children,
  open,
  setOpen,
  className = "",
}: Props) {
  const [done, setDone] = useState(false);
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  const stopPropa = (e: React.FormEvent) => e.stopPropagation();

  const CloseIcon = ({ css, iconCss, ...props }: any) => (
    <div
      className="relative flex justify-end z-[10] p-0 m-0 "
      onClick={stopPropa}
      onMouseEnter={stopPropa}
      onMouseDown={stopPropa}
    >
      <span
        onClick={(_) => {
          closePop();
          document.body.style.overflow = "auto";
        }}
        {...props}
        className={
          "bg-slate-200 dark:bg-slate-500 p-0 absolute rounded-full text-3xl -top-3 -right-3 shadow-md ring-1 ring-slate-300 dark:ring-slate-400 hover:scale-105 cursor-pointer z-50   " +
          css
        }
      >
        <IoClose className={" dark:text-white " + iconCss} />
      </span>
    </div>
  );

  const closePop = (cb?: (open?: boolean, done?: boolean) => any) => {
    setDone(true);
    popRef.current?.classList.add("pop-out");
    popRef.current
      ? (popRef.current.onanimationend = () => cb?.(open, done))
      : cb?.(open, done);
  };

  return (
    <div
      className={
        "fixed top-0 left-0 w-full h-full min-h-screen backdrop-blur-sm bg-opacity-60   overflow-hidden flex items-center justify-center bg-slate-900 flex-col z-[999] p-2 gap-0 overflow-y-auto  "
      }
      onClick={(e) => {
        stopPropa(e);
        closePop();
        document.body.style.overflow = "auto";
      }}
      onMouseEnter={stopPropa}
      onMouseDown={stopPropa}
    >
      <div
        ref={popRef}
        onAnimationEnd={(e) => {
          if (done) {
            setOpen(false);
            setDone(false);
          }
        }}
        onClick={stopPropa}
        className={
          "card card-shadow card-ring z-[20] animate-pop2 shadow-slate-600 w-full col_ p-6 " +
          className
        }
      >
        <CloseIcon />
        {children(closePop)}
      </div>
    </div>
  );
}
