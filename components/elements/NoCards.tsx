type props = {
  text?: string;
  children?: any;
  css?: string;
  button?: boolean;
};

export default function NoCards({ text = "No Cards", children, css }: props) {
  return (
    <div className="flex flex-1 bg-red-400d  flex-col justify-center items-center ring-1d p-3">
      <div
        className={
          "flex flex-1 w-full flex-col items-center justify-center bg-slate-100d dark:bg-layer-50d min-h-[200px] rounded-3xl max-w-xl max-h-[60%]  gap-2 " +
          css
        }
      >
        <h1 className="text-phar font-medium pb-1">{text}</h1>
        {children}
      </div>
    </div>
  );
}
