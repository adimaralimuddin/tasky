import { useUser } from "@auth0/nextjs-auth0";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import useFieldsGetter from "../../../../features/app/fields/useFieldsGetter";
import { CardTypes, FieldType } from "../../../../features/card/CardType";
import useTopicGetter from "../../../../features/topic/useTopicGetter";
import useViewer from "../../../../features/viewer/useViewer";
import { DEF_USER } from "../../../../lib/public";
import AudioElement from "../../../elements/AudioEl";
import Box from "../../../elements/Box";
import ImageItem from "../../../elements/ImageItem";

const CardItemOptions = dynamic(() => import("./CardItemOptions"), {
  ssr: false,
});
const CardEditor = dynamic(() => import("../cardEditor/CardEditor"), {
  ssr: false,
});
const CardDeleter = dynamic(() => import("../cardEditor/CardDeleter"), {
  ssr: false,
});

type props = {
  card: CardTypes;
  side?: "fronts" | "backs" | "both";
  key?: any;
  index?: boolean;
  css?: string;
  allowOption?: boolean;
  imageViewer?: boolean;
};
export default function CardItem({
  card,
  index,
  css,
  allowOption = true,
  imageViewer = true,
  side = "both",
}: props) {
  const { user } = useUser();
  // const [card, setCard] = useState(card_);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { getSelectedTopicId } = useTopicGetter();
  const topicId = getSelectedTopicId();

  const { getFields } = useFieldsGetter();
  const { fronts, backs } = getFields();

  const viewer = useViewer();
  const { textSize, imageSize, viewLebel, status, category } = viewer;

  if (status !== card?.level && status !== "all") {
    return null;
  }

  if (category !== card?.category && category !== "all") {
    return null;
  }

  // console.log(`cards`,card);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={
        "card block items-center ring-slate-200 my-3 min-w-[100px] shadow-none   ring-1 p-0 card-ring dark:ring-layer-sec " +
        css
      }
    >
      {index && card?.ind != undefined && (
        <span className="relative">
          <small className="absolute top-1 -left-4 z-10 text-phar">
            {card?.ind + 1}
          </small>
        </span>
      )}
      <CardItemOptions
        allowOption={allowOption}
        card={card}
        hovered={hovered}
        setHovered={setHovered}
        setIsDeleting={setIsDeleting}
        setIsEditing={setIsEditing}
        userId={user?.sub || undefined}
      />

      {!isEditing && (
        <div className=" overflow-hidden flex flex-col sm:flex-row px-2 gap-2 sm:px-4">
          {(side == "fronts" || side == "both") && (
            <CardSides
              card={card}
              type="fronts"
              textSize={textSize}
              imageSize={imageSize}
              lebel={viewLebel}
              view={fronts}
              side={side}
              imageViewer={imageViewer}
            />
          )}
          {side == "both" && (
            <div className="ring-2 ring-slate-200 dark:ring-slate-600  my-3"></div>
          )}
          {(side == "backs" || side == "both") && (
            <CardSides
              card={card}
              type="backs"
              textSize={textSize}
              imageSize={imageSize}
              lebel={viewLebel}
              view={backs}
              side={side}
              imageViewer={imageViewer}
            />
          )}
        </div>
      )}
      <div className={" text-slate-400 flex gap-3  " + viewer.textSize}>
        {viewer?.viewLevel && (
          <p
            style={{ fontSize: fontSize(textSize) }}
            className="flex flex-cold px-3  p-2 dark:text-slate-400   "
          >
            status: <span className="text-red-400 px-2"> {card?.level}</span>
          </p>
        )}
        {viewer?.viewCategory && (
          <p
            style={{ fontSize: fontSize(textSize) }}
            className="px-3 p-2 dark:text-slate-400 "
          >
            category: {card?.category}
          </p>
        )}
      </div>
      <div className="p-2 flex_">
        <CardEditor
          open={isEditing}
          setOpen={setIsEditing}
          editorMode={viewer.editorMode}
          card={card}
          onCancel={() => {
            setIsEditing(false);
            setHovered(false);
          }}
        />
        <CardDeleter
          cardId={card.id}
          isDeleting={isDeleting}
          setIsDeleting={setIsDeleting}
          topicId={topicId}
          editorMode={viewer.editorMode}
          userId={user?.sub || DEF_USER}
        />
      </div>
    </div>
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

export function CardSides({
  card,
  type,
  textSize,
  imageSize,
  lebel,
  view,
  side,
  imageViewer,
}: CardFrontsProps) {
  // console.log(`card fronts `, card);

  return (
    <div
      className={
        "flex-1 p-1 " + ""
        // (lebel ? " items-center " : " items-center  ")
      }
    >
      <div className=" col_ gap-2 flex-1 ">
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
  imageSize = 100,
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
  const myView = view?.find((f: FieldType) => f?.viewId === field?.viewId);

  if (!myView?.view) {
    // hide field if the view turned off or false
    return null;
  }

  if (!field?.value && !lebel) {
    // if somehow the template changed then, return only the matched view
    return null;
  }

  return (
    <div className="ring-1d">
      <div className="flex leading-none sm:leading-normal gap-1 items-start  flex-col-reverse sm:flex-row sm:gap-2 ">
        {lebel && (
          <p
            style={{
              fontSize: fontSize(textSize),
            }}
            className={`text-slate-400 dark:text-slate-500 font-normal pl-1 sm:pl-0  `}
          >
            {myView?.text}
          </p>
        )}
        {myView?.type !== "image" && myView?.type !== "audio" && (
          <p
            style={{
              fontSize: fontSize(textSize),
            }}
            className={
              "flex-1  text-phar max-h-[150px] leading-normal font-normal overflow-y-auto min-h-[10px] " +
              textSize
            }
          >
            {field?.value}
          </p>
        )}
        {myView?.type == "image" && field?.value && (
          <ImageItem
            src={field?.value}
            width={imageSize}
            height={imageSize}
            imageViewer={imageViewer}
          />
        )}
        {myView?.type == "audio" && field?.value && (
          <AudioElement src={field?.value} controls />
        )}
      </div>
    </div>
  );
}

const fontSize = (
  size: string | number = 1,
  s = ".83rem",
  n = ".88rem",
  l = "1rem",
  xs = ".77rem",
  xl = "1.2rem"
) =>
  size == 1
    ? s
    : size == 2
    ? n
    : size == 3
    ? l
    : size == 0
    ? xs
    : size == 4
    ? xl
    : n;
