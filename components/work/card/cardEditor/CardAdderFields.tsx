import Image from "next/image";
import { ChangeEvent, memo, useEffect, useRef, useState } from "react";
import { SideType } from "../../../../features/app/appSlice";
import { FieldType } from "../../../../features/card/CardType";
import { ImageIcon, Mp3, XIcon } from "../../../../lib/icons";

interface FieldsProps {
  fields: FieldType[];
  side: SideType;
  updated: boolean;
}
interface FieldProps {
  data: FieldType;
  side: SideType | "";
  ind: number;
}

export const MemoizedFields = memo(Fields);

export function Fields(props: FieldsProps) {
  return (
    <div className="dp-2  dflex-1 ">
      <h4 className="text-accent  text-center font-bold">{props.side}</h4>
      {props.fields?.map((field: any, ind: number) => (
        <Field
          data={field}
          side={props.side}
          key={field?.text + ind}
          ind={ind}
        />
      ))}
    </div>
  );
}

export function Field({ data, side = "", ind }: FieldProps) {
  const localVal = localStorage.getItem(data?.text + side);

  const onInputHandler = (e: any) => {
    const val = e.target.value;
    localStorage.setItem(data.text + side, val);
  };

  const InputC = (props: any) => (
    <div className="flex col_ gap-0 ditems-center gap-d leading-none">
      <label htmlFor={data.text + "%*" + side}>
        <p className=" whitespace-nowrap px-3 text-phar font-normal">
          {data?.text}
        </p>
      </label>
      <input
        autoFocus={ind === 0 && side === "front" ? true : false}
        {...props}
        text={data.text}
        name={data.text + "%*" + side}
        defaultValue={localVal || data?.value}
        data-type={data.type}
        data-name={data.text}
        onInput={onInputHandler}
        type={data?.type || "text"}
        className={
          " bg-layer-1 bg-slate-200 ring-2d ring-slate-200 dark:ring-1d dark:ring-slate-500 w-full p-[5px] px-2 text-[1rem] rounded-lg"
        }
      />
    </div>
  );

  const type = () => {
    switch (data.type) {
      case "audio":
        return (
          <FileInput
            text={data?.text}
            side={side}
            Icon={Mp3}
            type={data?.type}
          />
        );
      case "image":
        return (
          <FileInput
            text={data?.text}
            side={side}
            Icon={ImageIcon}
            type={data?.type}
          />
        );
      default:
        return <InputC />;
    }
  };

  return (
    <div
      className={
        "flex  gap-2 " +
        (data.type == "text" || data.type == "number" ? "flex-col" : "")
      }
    >
      {type()}
    </div>
  );
}

function FileInput(props: {
  text: string;
  side: SideType | "";
  Icon: any;
  type: "audio" | "image" | "text" | "number";
}) {
  const [imgSrc, setImgSrc] = useState();
  const [file, setFile] = useState<any>();
  const inf: any = useRef();

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e: any) => setImgSrc(e.target?.result);
    reader.readAsDataURL(file);
  }, [file]);

  const onCancel = () => {
    inf.current.value = null;
    setFile(null);
    setImgSrc(undefined);
  };

  return (
    <div className="flex items-center gap-2   py-1 rounded-md ">
      <p>{props.text}</p>
      <div className="flex flex-col ">
        <div className="flex gap-2 items-center ">
          <p className=" flex items-center gap-2 whitespace-nowrap ring-1 px-2 rounded-md hover:bg-slate-200  dark:hover:bg-slate-500">
            <props.Icon className="text-xl" />
            <label
              className="cursor-pointer"
              htmlFor={props.text + "%*" + props.side}
            >
              {" "}
              choose {props.type}
            </label>
          </p>
          <XIcon
            onClick={onCancel}
            className="hover:scale-110 transition cursor-pointer p-1 text-2xl rounded-full dark:bg-orange-600 bg-orange-600 text-white"
          />
        </div>
        {imgSrc &&
          (props.type == "audio" ? (
            <div className="my-2">
              <audio className=" w-full " src={imgSrc} controls />
              <small className="text-slate-600">
                {file?.name?.slice(1, 30)}..
              </small>
            </div>
          ) : (
            <div className="py-2 flex flex-col">
              <Image
                className=" rounded-md overflow-hidden"
                src={imgSrc}
                width={200}
                height={200}
                alt=""
              />
              <small className="text-slate-600">
                {file?.name?.slice(1, 30)}..
              </small>
            </div>
          ))}
      </div>
      <input
        id={props.text + "%*" + props.side}
        ref={inf}
        onInput={(e: ChangeEvent<HTMLInputElement>) =>
          setFile(e.target?.files?.[0])
        }
        type="file"
        accept={props.type == "image" ? "image/*" : "audio/*"}
        name={props.text + "%*" + props.side}
        className={"w-full hidden"}
      />
    </div>
  );
}
