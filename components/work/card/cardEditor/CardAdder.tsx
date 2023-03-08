import { nanoid } from "nanoid";
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
import CardQueryView from "../../viewer/CardQueryView";
import CardEditormodeToggler from "./CardEditormodeToggler";

const CardLists = dynamic(() => import("../cardLists/CardLists"), {
  loading: () => <p>cards lists..</p>,
});

export default function CardAdder({ classId }: { classId: string | any }) {
  return (
    <div className="container_ flex-col animate-fadein">
      <ContentHeader extraPath="add cards" removeMiddlePaths={true} />
      <AdderItem classId={classId} />
      <CardLists />
    </div>
  );
}

export function AdderItem({ index, classId }: any) {
  const firstInputref = useRef(null);
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

    // console.log(`card data to add`, data);

    addCard(data, () => {
      // clear fields from local storage
      fronts_?.forEach((f) => localStorage.removeItem(f.text + "front"));
      backs_?.map((f) => localStorage.removeItem(f.text + "back"));
    });
  };

  return (
    <div className="col_ py-2">
      <h3 className="  text-primary-light pt-2 text-center text-sm sm:text-lg">
        Add Cards for {topic?.name}{" "}
      </h3>
      <form className="" onSubmit={onAddCardHandler}>
        <div className="flex_ justify-between pb-2 flex-wrap">
          <span className="flex_">
            <CardQueryView />
            <CardEditormodeToggler />
          </span>
          <button type="submit" className="btn-prime">
            Add New Card
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 card card-shadow py-2 ">
          <Fields side="front" fields={fronts_} />
          <Fields side="back" fields={backs_} />
        </div>
        <small className="px-2">press "enter" to save.</small>
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
        id: nanoid(),
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
    <div className="dp-2  dflex-1 ">
      <h4 className="text-accent  text-center font-bold">{side}</h4>
      {fields?.map((field: any, ind: number) => (
        <Field data={field} side={side} key={field?.text + ind} ind={ind} />
      ))}
    </div>
  );
}

export function Field({ data, side = "", ind }: any) {
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
    <div className="flex items-center gap-2   py-1 rounded-md ">
      <p>{text}</p>
      <div className="flex flex-col ">
        <div className="flex gap-2 items-center ">
          <p className=" flex items-center gap-2 whitespace-nowrap ring-1 px-2 rounded-md hover:bg-slate-200  dark:hover:bg-slate-500">
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
