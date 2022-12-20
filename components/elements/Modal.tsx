import { IoClose } from "react-icons/io5";

export default function Modal({
  children: Children,
  open,
  setOpen,
  css,
}: {
  children: any;
  open: boolean;
  setOpen?: any;
  css?: string;
}) {
  if (!open) return null;

  const stopPropa = (e: React.FormEvent) => e.stopPropagation();

  const closeIcon = ({ css, iconCss, ...props }: any) => (
    <div
      className="relative flex justify-end"
      onClick={stopPropa}
      onMouseEnter={stopPropa}
      onMouseDown={stopPropa}
    >
      <span
        onClick={(_) => setOpen(false)}
        {...props}
        className={
          "bg-slate-200 dark:bg-slate-500 p-1 rounded-full text-3xl absolute -top-6 -right-5 shadow-md ring-1 ring-slate-300 dark:ring-slate-400 hover:scale-105 cursor-pointer " +
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
        "top-0 left-0 w-full h-full backdrop-blur-sm bg-opacity-60 fixed flex items-center justify-center bg-slate-900 flex-col z-50 p-2 " +
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
