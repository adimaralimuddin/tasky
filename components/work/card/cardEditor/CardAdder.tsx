import dynamic from "next/dynamic";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import useFieldsGetter from "../../../../features/app/fields/useFieldsGetter";
import { FieldType } from "../../../../features/card/CardType";
import useCardAdder from "../../../../features/card/useCardAdder";
import useTopicGetter from "../../../../features/topic/useTopicGetter";
import { ImageIcon, Mp3, XIcon } from "../../../../lib/icons";
import BtnBack from "../../../elements/BtnBack";
import BtnPrime from "../../../elements/BtnPrime";
import ContentHeader from "../../../elements/ContentHeader";

const CardLists = dynamic(() => import("../cardLists/CardLists"), {
  loading: () => <p>cards lists..</p>,
});

export default function CardAdder({ classId }: { classId: string | any }) {
  return (
    <div className="container_ flex-col">
      <ContentHeader Action={<BtnBack content="category" />} />
      <AdderItem classId={classId} />
      <CardLists />
    </div>
  );
}

export function AdderItem({ index, classId }: any) {
  const { fronts: fronts_, backs: backs_ } = useFieldsGetter().getFieldsRaw();
  const topic = useTopicGetter().getSelectedTopic();
  const { addCard } = useCardAdder();

  const onAddCardHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElem = e.target;

    const fronts = filterFields("front", formElem, fronts_);
    const backs = filterFields("back", formElem, backs_);

    const data = {
      classId,
      name: "",
      description: "",
      fronts,
      backs,
    };

    addCard(data, () => {
      // clear fields from local storage
      fronts_?.forEach((f) => localStorage.removeItem(f.text + "front"));
      backs_?.map((f) => localStorage.removeItem(f.text + "back"));
    });
  };

  return (
    <div className="col_ px-4 ">
      <h3 className=" font-bold text-indigo-400 text-center">
        Add Cards for {topic?.name}{" "}
      </h3>
      <form className="" onSubmit={onAddCardHandler}>
        <div className="flex gap-6  flex-wrap ">
          <Fields side="front" fields={fronts_} />
          <Fields side="back" fields={backs_} />
        </div>
        <div className="flex p-1 gap-2 pt-4">
          <span className="flex flex-col">
            <BtnPrime type="submit" css="m-0">
              save
            </BtnPrime>
          </span>
        </div>
      </form>
    </div>
  );
}

const filterFields = (type: "front" | "back", formElem: any, lists: any) => {
  // map through form input elements
  // to select only the input with specified type: front or back
  const mappedFields = lists?.map((fields: FieldType, ind: number) => {
    const inputElem = formElem?.[fields.text + "%*" + type];

    if (inputElem) {
      return {
        ...fields,
        ind,
        value:
          inputElem.type === "text" || inputElem.type === "number"
            ? inputElem.value
            : inputElem.files?.[0],
      };
    }
    // if no input element, just return undefined
    // this returned map will then be filtered bellow to remove undefined fields
  });

  // filter to remove all undefined fields
  const filteredFields = mappedFields.filter((p: any) => p);

  // return filtered fields
  return filteredFields;
};

function Fields({ fields, side }: any) {
  return (
    <div className="ring-1 ring-slate-200 rounded-xl p-2  flex-1 bg-white dark:bg-slate-700 dark:ring-2 dark:ring-slate-600">
      <h4 className="text-indigo-400 text-center">{side}</h4>
      {fields?.map((field: any, ind: number) => (
        <Field data={field} side={side} key={field?.text + ind} />
      ))}
    </div>
  );
}

export function Field({ data, side = "" }: any) {
  const localVal = localStorage.getItem(data?.text + side);

  const onInputHandler = (e: any) => {
    const val = e.target.value;
    localStorage.setItem(data.text + side, val);
  };

  const InputC = (props: any) => (
    <div className="flex items-center gap-d">
      <label className=" whitespace-nowrap" htmlFor={data.text + "%*" + side}>
        {data?.text} :
      </label>
      <input
        {...props}
        text={data.text}
        name={data.text + "%*" + side}
        defaultValue={localVal || data?.value}
        data-type={data.type}
        data-name={data.text}
        onInput={onInputHandler}
        type={data?.type || "text"}
        className={
          "bg-slate-100 dark:ring-1 dark:ring-slate-500 w-full p-1 px-2 text-[.9rem]"
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
        "flex  gap-2 ring-1d p-2 " +
        (data.type == "text" || data.type == "number" ? "flex-col" : "")
      }
    >
      {type()}
    </div>
  );
}

function FileInput({ text, side, Icon, type }: any) {
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
    <div className="flex items-center gap-2  hover:bg-slate-200 dark:hover:bg-slate-500 p-1 rounded-md ">
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <p className=" flex items-center gap-2 whitespace-nowrap ring-1 px-2 rounded-md">
            <Icon className="text-xl" />
            <label className="cursor-pointer" htmlFor={text + "%*" + side}>
              {" "}
              choose {type}
            </label>
          </p>
          <XIcon
            onClick={onCancel}
            className="hover:scale-110 transition cursor-pointer p-1 text-2xl rounded-full dark:bg-orange-600 bg-orange-600 text-white"
          />
        </div>
        {imgSrc &&
          (type == "audio" ? (
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
        id={text + "%*" + side}
        ref={inf}
        onInput={(e: any) => setFile(e.target?.files?.[0])}
        type="file"
        accept={type == "image" ? "image/*" : "audio/*"}
        name={text + "%*" + side}
        className={"w-full hidden"}
      />
    </div>
  );
}
