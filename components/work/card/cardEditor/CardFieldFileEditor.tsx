import { useState } from "react";
import { FieldType } from "../../../../features/card/CardType";
import { ImageIcon, Mp3, RefreshIcon } from "../../../../lib/icons";
import _charLimits from "../../../../lib/utils/_charLimits";
import _fileReader from "../../../../lib/utils/_fileReader";
import ImageItem from "../../../elements/ImageItem";

export default function CardFieldFileEditor({
  data,
  view,
  setter,
  onChange,
}: {
  data: FieldType;
  view: FieldType;
  setter?: any;
  onChange?: (file: File | undefined) => void;
}) {
  const [src, setSrc] = useState<string | ArrayBuffer | null | undefined>(
    data?.value
  );
  const [file, setFile] = useState<File | undefined>(undefined);

  const onFileInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target?.files?.[0];
    if (!file) return;

    _fileReader(file, setSrc);

    setFile(file);
    onChange?.(file);
    onSetHandler(file);
  };

  const onSetHandler = (file: any) => {
    setter?.((p: FieldType[]) => {
      const n = p?.map((f) => {
        if (f?.id == data?.id) {
          return { ...f, type: view.type, text: view.text, newValue: file };
        }
        return f;
      });
      return n;
    });
  };

  const onResetHandler = () => {
    setSrc(data?.value);
    setFile(undefined);
  };

  return (
    <div className="flex flex-wrap gap-3 p-2 ">
      <div className="px-1 flex flex-col gap-2 ">
        <div className="flexd items-center gap-2">
          <div className="col_ pb-2">
            <p>{view?.text || data?.text} </p>
            {view?.type == "image" ? (
              <ImageItem src={src} />
            ) : (
              <audio src={String(src)} controls />
            )}
          </div>
          <div className="flex items-center gap-2 my-1">
            {view?.type == "audio" ? <Mp3 /> : <ImageIcon />}
            <label
              className="ring-1 px-1 rounded-md ring-slate-300 cursor-pointer"
              htmlFor={data?.id + "input"}
            >
              Change
            </label>
            <p
              onClick={onResetHandler}
              className="flex gap-1 items-center ring-1 px-1 rounded-md ring-slate-300 cursor-pointer"
            >
              <RefreshIcon />
              reset
            </p>
          </div>
          <input
            id={data?.id + "input"}
            type="file"
            accept={view?.type === "image" ? "images/*" : "audio/*"}
            className="hidden"
            onInput={onFileInputHandler}
          />
        </div>
        <small>{file?.name}</small>
      </div>
    </div>
  );
}
