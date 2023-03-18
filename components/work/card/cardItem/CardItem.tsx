import { useUser } from "@auth0/nextjs-auth0";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import useFieldsGetter from "../../../../features/app/fields/useFieldsGetter";
import { CardTypes, FieldType } from "../../../../features/card/CardType";
import useTopicGetter from "../../../../features/topic/useTopicGetter";
import useViewer from "../../../../features/viewer/useViewer";
import AudioElement from "../../../elements/AudioEl";
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
  // key?: any;
  index?: boolean;
  listInd?: number;
  cardIndex?: boolean;
  css?: string;
  allowOption?: boolean;
  imageViewer?: boolean;
  showAllFields?: boolean;
};
export default function CardItem({
  card,
  index,
  listInd = 0,
  cardIndex,
  css,
  allowOption = true,
  imageViewer = true,
  side = "both",
  showAllFields,
}: props) {
  const { user } = useUser();
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

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={
        "card card-ring animate-pop2d block items-center ring-slate-200d my-3 min-w-[100px] shadow-none p-0 card-ring dark:ring-layer-sec " +
        css
      }
    >
      {index && (
        <span className="relative">
          <small className="absolute top-1 right-4 z-10 text-phar">
            {cardIndex
              ? card?.ind !== undefined && card?.ind !== null
                ? card?.ind + 1
                : listInd + 1
              : listInd + 1}
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
              showAllFields={showAllFields}
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
              showAllFields={showAllFields}
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
      <div className={" flex_ " + (viewer.editorMode && " p-2 ")}>
        {(isEditing || viewer.editorMode) && (
          <CardEditor
            open={isEditing}
            setOpen={setIsEditing}
            editorMode={viewer.editorMode}
            card={card}
            onCancel={() => {
              setHovered(false);
            }}
          />
        )}
        {(isDeleting || viewer.editorMode) && (
          <CardDeleter
            cardId={card?.id}
            isDeleting={isDeleting}
            setIsDeleting={setIsDeleting}
            topicId={topicId}
            editorMode={viewer.editorMode}
            userId={user?.sub || undefined}
          />
        )}
      </div>
    </div>
  );
}

type CardSidesProps = {
  card: any;
  type: string;
  textSize: any;
  imageSize: any;
  lebel?: boolean;
  view: any;
  side: string;
  imageViewer?: boolean;
  showAllFields?: boolean;
};

export function CardSides(props: CardSidesProps) {
  return (
    <div className={"flex-1 p-1 "}>
      <div className=" col_ gap-2 flex-1 ">
        {Array.isArray(props?.card?.[props?.type]) &&
          props?.card?.[props?.type]?.map((field: FieldType) => (
            <FieldItem
              view={props?.view}
              field={field}
              key={field?.id}
              textSize={props?.textSize}
              imageSize={props?.imageSize}
              lebel={props?.lebel}
              imageViewer={props?.imageViewer}
              showAllFields={props?.showAllFields}
            />
          ))}
      </div>
    </div>
  );
}

interface FieldItemType {
  field: FieldType;
  textSize: any;
  imageSize: any;
  lebel?: boolean;
  view: any;
  imageViewer?: boolean;
  showAllFields?: boolean;
}
function FieldItem(props: FieldItemType) {
  const myView = props?.view?.find(
    (f: FieldType) => f?.viewId === props?.field?.viewId
  );

  if (!myView?.view) {
    // hide field if the view turned off or false
    if (!props?.showAllFields) {
      return null;
    }
  }

  if (!props?.field?.value && !props?.lebel) {
    // if somehow the template changed then, return only the matched view
    if (!props?.showAllFields) {
      return null;
    }
  }

  return (
    <div className="ring-1d">
      <div className="flex leading-none sm:leading-normal gap-1 items-start  flex-col-reverse sm:flex-row sm:gap-2 ">
        {(props?.lebel || props?.showAllFields) && (
          <p
            style={{
              fontSize: fontSize(props?.textSize),
            }}
            className={`text-slate-400 dark:text-slate-500 font-normal pl-1 sm:pl-0  `}
          >
            {myView?.text || props?.field?.text}
          </p>
        )}
        {myView?.type !== "image" && myView?.type !== "audio" && (
          <p
            style={{
              fontSize: fontSize(props?.textSize),
            }}
            className={
              "flex-1  text-phar max-h-[150px] leading-normal font-normal overflow-y-auto min-h-[10px] " +
              props?.textSize
            }
          >
            {props?.field?.value}
          </p>
        )}
        {myView?.type == "image" && props?.field?.value && (
          <ImageItem
            src={props?.field?.value}
            width={props?.imageSize}
            height={props?.imageSize}
            imageViewer={props?.imageViewer}
          />
        )}
        {myView?.type == "audio" && props?.field?.value && (
          <AudioElement src={props?.field?.value} controls />
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
