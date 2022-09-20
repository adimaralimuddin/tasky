import { useUser } from "@auth0/nextjs-auth0";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardTypes, FieldType } from "../../../features/card/CardType";
import { useCardMutation } from "../../../features/card/useCardMutation";
import useCards from "../../../features/card/useCards";
import useTemplate from "../../../features/template/useTemplate";
import useWork from "../../../features/work/useWork";
import { ImageIcon, Mp3 } from "../../../lib/icons";
import Box from "../../elements/Box";
import BtnPrime from "../../elements/BtnPrime";
import ContentHeader from "../../elements/ContentHeader";
import Verifier from "../../elements/Verifier";
import CardItem from "./CardItem";

export default function CardAdder({ classId }: { classId: string }) {
  const { work } = useWork();
  const { user } = useUser();
  const {
    template: { data: template },
  } = useTemplate(work.selectedTopic?.templateId);

  const topic = work.selectedTopic;
  const { cards } = useCards(topic?.id);

  return (
    <Box css="flex-1">
      <ContentHeader />
      <AdderItem
        template={template}
        topic={work.selectedTopic}
        user={user}
        classId={classId}
      />
      <div className="my-2">
        {cards?.data
          ?.map((c, ind) => ({ ...c, ind }))
          ?.sort((a, b) => b?.ind - a?.ind)
          ?.map((card: CardTypes) => (
            <CardItem card={card} key={card?.id} index={true} />
          ))}
      </div>
    </Box>
  );
}

export function AdderItem({ template, topic, user, index, classId }: any) {
  const parseFields = (type: string) => JSON.parse(template?.[type] || "[]");
  const [fronts, setFronts] = useState(parseFields("fronts"));
  const [backs, setbacks] = useState(parseFields("backs"));
  const { createCard } = useCardMutation(topic?.id);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const parseFields = (type: string) => JSON.parse(template?.[type] || "[]");
    setFronts(parseFields("fronts"));
    setbacks(parseFields("backs"));
  }, [template, topic, user]);

  const onAddCardHandler = async (e) => {
    e.preventDefault();
    const tar = e.target;

    const front = filterFields("front", tar, fronts);
    const back = filterFields("back", tar, backs);

    const data = {
      classId,
      userId: user?.sub,
      topicId: topic?.id,
      name: "",
      description: "",
      fronts: front,
      backs: back,
    };
    setIsAdding(true);
    createCard(data, {
      onSuccess: () => {
        fronts?.map((f) => localStorage.removeItem(f.text + "front"));
        backs?.map((f) => localStorage.removeItem(f.text + "back"));
        setIsAdding(false);
      },
      onError: () => {
        setIsAdding(false);
      },
    });
  };

  const filterFields = (type: string, tar, lists) => {
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
    <Box css="flex flex-col shadow-md ring-2 ring-slate-200 p-3 bg-slate-50d">
      <h1 className="py-3 font-bold text-indigo-400 text-center">Add Card</h1>
      <Verifier
        message={
          <div className="flex gap-2 items-center animate-pulse">
            <h2>adding card ...</h2>
          </div>
        }
        open={isAdding}
        setOpen={setIsAdding}
        actions={false}
      />
      <form onSubmit={onAddCardHandler}>
        <div className="flex gap-3 flex-wrap ">
          <Fields side="front" fields={fronts} />
          <Fields side="back" fields={backs} />
        </div>
        <div className="flex p-1 gap-2 py-4">
          <span className="flex flex-col">
            <BtnPrime type="submit" css="m-0">
              save
            </BtnPrime>
            <small className="text-slate-400">(enter) to save</small>
          </span>
        </div>
      </form>
    </Box>
  );
}

function Fields({ fields, side }: any) {
  return (
    <div className="ring-1 rounded-xl p-1 ring-indigo-100 flex-1 bg-white">
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

  const Input = (props: any) => (
    <input
      {...props}
      name={data.text + "%*" + side}
      defaultValue={localVal || data?.value}
      data-type={data.type}
      data-name={data.text}
      onInput={onInputHandler}
      type={data?.type || "text"}
      className={"bg-slate-100 w-full"}
    />
  );

  const type = () => {
    switch (data.type) {
      case "text":
        return <Input />;
      case "number":
        return <Input />;
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
        return null;
    }
  };

  return (
    <div
      className={
        "flex  gap-2 ring-1d p-2 " +
        (data.type == "text" || data.type == "number" ? "flex-col" : "")
      }
    >
      <p>{data.text}</p>
      {type()}
    </div>
  );
}

function FileInput({ text, side, Icon, type }: any) {
  const [imgSrc, setImgSrc] = useState();
  const [file, setFile] = useState();

  useEffect(() => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => setImgSrc(e.target?.result);
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="flex items-center gap-2 hover:bg-slate-200 p-1 rounded-md cursor-pointer">
      <div className="flex flex-col">
        <p className="flex items-center gap-2 whitespace-nowrap ring-1 px-2 rounded-md">
          <Icon className="text-xl" />
          <label htmlFor={text + "%*" + side}> choose {type}</label>
        </p>
        {imgSrc &&
          (type == "audio" ? (
            <div className="my-2">
              <audio src={imgSrc} controls />
            </div>
          ) : (
            <div className="py-2 flex flex-col">
              <Image
                className=" rounded-md overflow-hidden"
                src={imgSrc}
                width={200}
                height={200}
              />
              <small className="text-slate-600">
                {file?.name?.slice(1, 30)}..
              </small>
            </div>
          ))}
      </div>
      <input
        id={text + "%*" + side}
        onInput={(e) => setFile(e.target?.files?.[0])}
        type="file"
        accept={type == "image" ? "image/*" : "audio/*"}
        name={text + "%*" + side}
        className={"w-full hidden"}
      />
    </div>
  );
}
