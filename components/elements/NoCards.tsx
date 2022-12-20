import BtnCardAdder from "./BtnCardAdder";

type props = {
  text?: string;
  children?: any;
  css?: string;
  button?: boolean;
};

export default function NoCards({
  text = "No Cards",
  children,
  css,
  button = true,
}: props) {
  return (
    <div
      className={
        "flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-600 min-h-[200px] rounded-xl m-2  gap-2 " +
        css
      }
    >
      <h1 className="text-slate-400 dark:text-slate-300">{text}</h1>
      {button && <BtnCardAdder />}
      {children}
    </div>
  );
}
