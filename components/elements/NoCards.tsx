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
    <div className="flex flex-1 flex-col justify-center ring-1d p-3">
      <div
        className={
          "flex flex-1 flex-col items-center justify-center bg-slate-50 dark:bg-slate-600 min-h-[200px] rounded-xl  m-autod max-w-xl max-h-[60%]  gap-2 " +
          css
        }
      >
        <h1 className="text-slate-400 dark:text-slate-300 pb-1">{text}</h1>
        {button && <BtnCardAdder />}
        {children}
      </div>
    </div>
  );
}
