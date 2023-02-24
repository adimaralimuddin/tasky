import { useUser } from "@auth0/nextjs-auth0";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import useFieldsGetter from "../../../features/app/fields/useFieldsGetter";
import { CardTypes, FieldType } from "../../../features/card/CardType";
import useTopicGetter from "../../../features/topic/useTopicGetter";
import useViewer from "../../../features/viewer/useViewer";
import { DEF_USER } from "../../../lib/public";
import AudioElement from "../../elements/AudioEl";
import Box from "../../elements/Box";
import ImageItem from "../../elements/ImageItem";

const CardItemOptions = dynamic(
  () => import("./cardEditor/cardItem/CardItemOptions"),
  { ssr: false }
);
const CardEditor = dynamic(() => import("./CardEditor"), { ssr: false });
const CardDeleter = dynamic(() => import("./cardEditor/CardDeleter"), {
  ssr: false,
});

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
  const { user } = useUser();
  const [card, setCard] = useState(card_);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [hovered, setHovered] = useState(false);

  const { getSelectedTopicId } = useTopicGetter();
  const topicId = getSelectedTopicId();

  const { getFields } = useFieldsGetter();
  const { fronts, backs } = getFields();

  const viewer = useViewer();
  const textSize = viewer.textSize;
  const size: any = viewer?.imageSize;
  const imageSize = parseInt(size);
  const lebel = viewer.viewLebel;

  useEffect(() => {
    setCard(card_);
  }, [card_]);

  return (
    <Box
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      css={
        "flexd ring-1d dark:ring-2 ring-slate-200 items-center my-3 min-w-[100px] shadow-none bg-white  dark:ring-1 dark:ring-slate-600 dark:bg-slate-600 ring-1 p-0 " +
        css
      }
    >
      {index && card?.ind != undefined && (
        <span className="relative">
          <small className="absolute top-2 left-0 px-2 text-slate-500">
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
        <div className=" overflow-hidden flex flex-wrap justify-evenly ">
          {(side == "fronts" || side == "both") && (
            <CardFronts
              card={card}
              type="fronts"
              textSize={textSize}
              imageSize={imageSize}
              lebel={lebel}
              view={fronts}
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
            level: <span className="text-red-400 px-2"> {card?.level}</span>
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
      <CardDeleter
        cardId={card.id}
        isDeleting={isDeleting}
        setIsDeleting={setIsDeleting}
        topicId={topicId}
        userId={user?.sub || DEF_USER}
      />
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
  // console.log(`card fronts `, card);

  return (
    <div
      className={
        "m-1 flex  gap-1 justify-center  flex-1 px-3  " +
        (lebel ? " items-center " : " items-center  ")
      }
    >
      <div className="ring-1d ring-red-300 flex flex-wrap gap-3">
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
  // console.log(`view`, view);
  // console.log(`field`, field);

  const isView = () => view?.find((f: FieldType) => f?.text === field?.text);

  if (!isView()?.view) {
    // console.log(`no view`, isView());

    return null;
  }

  if (!field?.value && !lebel) {
    return null;
  }

  return (
    <div>
      <div className="flex  gap-2 items-start  flex-col  ">
        {lebel && (
          <p
            style={{
              fontSize: fontSize(textSize),
            }}
            className={`text-slate-400 dark:text-slate-400  `}
          >
            {field?.text} :
          </p>
        )}
        {field?.type !== "image" && field?.type !== "audio" && (
          <p
            style={{
              fontSize: fontSize(textSize),
            }}
            className={
              "flex-1 dark:text-slate-200 max-h-[150px] overflow-y-auto " +
              textSize
            }
          >
            {field?.value}
          </p>
        )}
        {field?.type == "image" && field?.value && (
          <ImageItem
            src={field?.value}
            width={imageSize}
            height={imageSize}
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
