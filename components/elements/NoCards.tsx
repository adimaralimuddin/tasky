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
        "flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-600 min-h-[200px] rounded-xl w-full h-full m-auto max-w-xl max-h-[60%]  gap-2 " +
        css
      }
    >
      <h1 className="text-slate-400 dark:text-slate-300 pb-3">{text}</h1>
      {button && <BtnCardAdder />}
      {children}
    </div>
  );
}
