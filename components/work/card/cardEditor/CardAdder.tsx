import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React, { LegacyRef, useEffect, useRef, useState } from "react";
import { CardTypes, FieldType } from "../../../../features/card/CardType";
import useCardAdder from "../../../../features/card/useCardAdder";
import { useCardMutation } from "../../../../features/card/useCardMutation";
import useCards from "../../../../features/card/useCards";
import useTemplate from "../../../../features/template/useTemplate";
import useWork from "../../../../features/work/useWork";
import { ImageIcon, Mp3, XIcon } from "../../../../lib/icons";
import { defUser, DEF_USER } from "../../../../lib/public";
import Box from "../../../elements/Box";
import BtnPrime from "../../../elements/BtnPrime";
import ContentHeader from "../../../elements/ContentHeader";
import Input from "../../../elements/Input";
import Loader from "../../../elements/Loader";
import CardItem from "../CardItem";

export default function CardAdder({ classId }: { classId: string | any }) {
  const { user } = useUser();
  const { work } = useWork();
  const { data } = useCards(work.selectedTopic?.id);

  const {
    template: { data: template },
  } = useTemplate(work.selectedTopic?.templateId);

  return (
    <div className="container_">
      <ContentHeader />
      <AdderItem
        template={template}
        topic={work.selectedTopic}
        user={user}
        classId={classId}
      />

      <div className="p-2">
        {data
          ?.map((c: CardTypes, ind: number) => ({ ...c, ind }))
          ?.sort((a: any, b: any) => b?.ind - a?.ind)
          ?.map((card: CardTypes) => (
            <CardItem card={card} key={card?.id} index={true} />
          ))}
      </div>
    </div>
  );
}

export function AdderItem({ template, topic, user, index, classId }: any) {
  const parseFields = (type: string) => JSON.parse(template?.[type] || "[]");
  const [fronts, setFronts] = useState(parseFields("fronts"));
  const [backs, setbacks] = useState(parseFields("backs"));
  // const { createCard, cardCreator } = useCardMutation(topic?.id);

  const { addCard } = useCardAdder(topic?.id);

  useEffect(() => {
    const parseFields = (type: string) => JSON.parse(template?.[type] || "[]");
    setFronts(parseFields("fronts"));
    setbacks(parseFields("backs"));
  }, [template, topic, user]);

  const onAddCardHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const tar = e.target;
    const x = defUser();
    console.log("x", x);

    const front = filterFields("front", tar, fronts);
    const back = filterFields("back", tar, backs);

    const data = {
      classId,
      userId: user?.sub || DEF_USER,
      topicId: topic?.id,
      name: "",
      description: "",
      fronts: front,
      backs: back,
    };

    addCard(data, () => {
      fronts?.map((f: any) => localStorage.removeItem(f.text + "front"));
      backs?.map((f: any) => localStorage.removeItem(f.text + "back"));
    });
  };

  const filterFields = (type: string, tar: any, lists: any) => {
    const ret = lists?.map((f: FieldType, ind: number) => {
      const x = tar?.[f.text + "%*" + type];
      if (x) {
        return {
          ...f,
          ind,
          value:
            x.type === "text" || x.type === "number" ? x.value : x.files?.[0],
        };
      }
    });
    const x = ret.filter((p: any) => {
      if (p != undefined) {
        return true;
      }
    });
    return x;
  };

  return (
    <div className="col_ px-4">
      <h1 className=" font-bold text-indigo-400 text-center">Add Card</h1>
      {/* <Loader message="adding card ... " open={cardCreator?.isLoading} /> */}
      <form className="p-3" onSubmit={onAddCardHandler}>
        <div className="flex gap-6  flex-wrap ">
          <Fields side="front" fields={fronts} />
          <Fields side="back" fields={backs} />
        </div>
        <div className="flex p-1 gap-2 py-4">
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

function Fields({ fields, side }: any) {
  return (
    <div className="ring-1 ring-slate-200 rounded-xl p-6 ring-indigo-100d flex-1 bg-white dark:bg-slate-700 dark:ring-2 dark:ring-slate-600">
      <h2 className="text-indigo-400 text-center">{side}</h2>
      {fields?.map((field: any) => (
        <Field data={field} side={side} key={field?.id} />
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
    <input
      {...props}
      text={data.text}
      name={data.text + "%*" + side}
      defaultValue={localVal || data?.value}
      data-type={data.type}
      data-name={data.text}
      onInput={onInputHandler}
      type={data?.type || "text"}
      className={"bg-slate-100 dark:ring-1 dark:ring-slate-500 w-full"}
    />
  );

  const inputProps = () => ({
    text: data.text,
    name: data.text + "%*" + side,
    defaultValue: localVal || data?.value,
    "data-type": data.type,
    "data-name": data.text,
    onInput: onInputHandler,
    type: data?.type || "text",
    className: "bg-slate-100 dark:ring-1 dark:ring-slate-500 w-full",
  });

  const type = () => {
    switch (data.type) {
      // case "text":
      //   return <Input text={data.text} {...inputProps} />;
      // case "number":
      //   return <Input text={data.text} {...inputProps} />;
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
      // return <Input text={data.text} {...inputProps} />;
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
        // value={file}
        onInput={(e: any) => setFile(e.target?.files?.[0])}
        type="file"
        accept={type == "image" ? "image/*" : "audio/*"}
        name={text + "%*" + side}
        className={"w-full hidden"}
      />
    </div>
  );
}
