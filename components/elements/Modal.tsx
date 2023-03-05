import { ReactElement } from "react";
import { IoClose } from "react-icons/io5";

export default function Modal({
  children: Children,
  open,
  setOpen,
  css,
}: {
  children: (Icon: any) => any;
  open: boolean;
  setOpen?: any;
  css?: string;
}) {
  if (!open) return null;

  const stopPropa = (e: React.FormEvent) => e.stopPropagation();

  const closeIcon = ({ css, iconCss, ...props }: any) => (
    <div
      className="relative flex justify-end z-[999] "
      onClick={stopPropa}
      onMouseEnter={stopPropa}
      onMouseDown={stopPropa}
    >
      <span
        onClick={(_) => setOpen(false)}
        {...props}
        className={
          "bg-slate-200 dark:bg-slate-500 p-1 absolute rounded-full text-3xl -top-3 -right-3 shadow-md ring-1 ring-slate-300 dark:ring-slate-400 hover:scale-105 cursor-pointer z-[999]   " +
          css
        }
      >
        <IoClose className={" dark:text-white " + iconCss} />
      </span>
    </div>
  );

  return (
    <div
      className={
        "top-0 left-0 w-full h-full min-h-screen backdrop-blur-sm bg-opacity-60 fixed  overflow-hidden flex items-center justify-center bg-slate-900 flex-col z-[999] p-2  " +
        css
      }
      onClick={stopPropa}
      onMouseEnter={stopPropa}
      onMouseDown={stopPropa}
    >
      {Children(closeIcon)}
    </div>
  );
}
