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
        "flex flex-col items-center justify-center bg-slate-50 min-h-[200px] rounded-xl m-1 text-slate-400 gap-2 " +
        css
      }
    >
      <h1>{text}</h1>
      {button && <BtnCardAdder />}
      {children}
    </div>
  );
}
