import React, { useState, useEffect } from "react";
import { CardTypes, FieldType } from "../../../features/card/CardType";
import { useCardMutation } from "../../../features/card/useCardMutation";
import useWork from "../../../features/work/useWork";
import { Pencil, Trash } from "../../../lib/icons";
import AudioElement from "../../elements/AudioEl";
import Box from "../../elements/Box";
import ImageItem from "../../elements/ImageItem";
import Loader from "../../elements/Loader";
import Option from "../../elements/Option";
import CardEditor from "./CardEditor";

type props = {
  card: CardTypes;
  side?: string;
  key?: any;
  index?: boolean;
  css?: string;
  allowOption?: boolean;
  imageViewer?: boolean;
};
export default function CardItem({
  card: card_,
  side = "both",
  index,
  css,
  allowOption = true,
  imageViewer = true,
}: props) {
  const [card, setCard] = useState(card_);
  const [isEditing, setIsEditing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const { work } = useWork();
  const { deleteCard, cardDeleter } = useCardMutation(work?.selectedTopic?.id);
  const textSize = work.textSize;
  const size: any = work?.imageSize;
  const imageSize = parseInt(size);
  const lebel = work.viewLebel;
  const options = [
    {
      text: "edit",
      icon: <Pencil />,
      action: () => {
        setIsEditing(true);
        setHovered(false);
      },
    },
    {
      text: "delete",
      icon: <Trash />,
      action: () => {
        if (card?.sample) {
          return alert(
            "sample card will not be deleted. you can always add, edit and delete your own card instead."
          );
        }
        deleteCard(card.id);
      },
    },
  ];

  useEffect(() => {
    setCard(card_);
  }, [card_]);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      css={
        "flexd ring-1 ring-slate-200 items-center p-0 my-5 min-w-[100px] shadow-lg bg-white dark:bg-slate-600 dark:ring-1 dark:ring-slate-600 " +
        css
      }
    >
      {index && card?.ind != undefined && (
        <span className="relative">
          <small className="absolute top-0 left-0 px-2 text-slate-500">
            {card?.ind + 1}
          </small>
        </span>
      )}
      <span className="relative flex justify-end p-1">
        <div className="absolute">
          {hovered && allowOption && <Option options={options} left={true} />}
        </div>
      </span>
      {!isEditing && (
        <div className=" overflow-hidden flex flex-wrap justify-evenly ">
          {(side == "fronts" || side == "both") && (
            <CardFronts
              card={card}
              type="fronts"
              textSize={textSize}
              imageSize={imageSize}
              lebel={lebel}
              view={work.fronts}
              side={side}
              imageViewer={imageViewer}
            />
          )}
          {side == "both" && <div className="ring-2 ring-slate-200 my-3"></div>}
          {(side == "backs" || side == "both") && (
            <CardFronts
              card={card}
              type="backs"
              textSize={textSize}
              imageSize={imageSize}
              lebel={lebel}
              view={work.backs}
              side={side}
              imageViewer={imageViewer}
            />
          )}
        </div>
      )}
      <div className={"p-2 text-slate-500 " + work.textSize}>
        {work?.viewLevel && (
          <p className="flex flex-cold">
            level: <span className="text-red-400 px-2"> {card?.level}</span>
          </p>
        )}
        {work?.viewCategory && <p>category: {card?.category}</p>}
      </div>
      <CardEditor
        open={isEditing}
        setOpen={setIsEditing}
        card={card}
        onCancel={() => {
          setIsEditing(false);
          setHovered(false);
        }}
        onUpdated={(data: CardTypes) => {
          setCard({ ...card, ...data });
        }}
      />
      <Loader message="deleting card ... " open={cardDeleter?.isLoading} />
    </Box>
  );
}

type CardFrontsProps = {
  card: any;
  type: string;
  textSize: any;
  imageSize: any;
  lebel?: boolean;
  view: any;
  side: string;
  imageViewer?: boolean;
};

export function CardFronts({
  card,
  type,
  textSize,
  imageSize,
  lebel,
  view,
  side,
  imageViewer,
}: CardFrontsProps) {
  return (
    <div
      className={
        "ring-1d m-1 flex flex-col gap-2 justify-center  flex-1 px-2 p-1 " +
        (lebel ? " items-center " : " items-center  ")
      }
    >
      <div className="ring-1d ring-red-300">
        {card?.[type]
          ?.sort((a: FieldType, b: FieldType) => a?.ind - b?.ind)
          ?.map((field: FieldType) => (
            <FieldItem
              view={view}
              field={field}
              key={field?.id}
              textSize={textSize}
              imageSize={imageSize}
              lebel={lebel}
              imageViewer={imageViewer}
            />
          ))}
      </div>
    </div>
  );
}

function FieldItem({
  field,
  textSize,
  imageSize = 150,
  lebel,
  view,
  imageViewer,
}: {
  field: FieldType;
  textSize: any;
  imageSize: any;
  lebel?: boolean;
  view: any;
  imageViewer?: boolean;
}) {
  const isView = () => view?.find((f: FieldType) => f?.text == field?.text);

  if (!isView()?.view) {
    return null;
  }

  if (!field?.value && !lebel) {
    return null;
  }

  return (
    <div>
      <div className="flex gap-2 items-start py-1">
        {lebel && (
          <p className={"text-slate-400 " + textSize}>{field?.text} :</p>
        )}
        {field?.type !== "image" && field?.type !== "audio" && (
          <p className={"flex-1 " + textSize}> {field?.value}</p>
        )}
        {field?.type == "image" && field?.value && (
          <ImageItem
            src={field?.value}
            width={imageSize || 130}
            height={imageSize || 130}
            imageViewer={imageViewer}
          />
        )}
        {field?.type == "audio" && field?.value && (
          <AudioElement src={field?.value} controls />
        )}
      </div>
    </div>
  );
}
