import React, { useState } from "react";
import { CardTypes, FieldType } from "../../../../features/card/CardType";
import _charLimits from "../../../../lib/utils/_charLimits";
import CardNewFieldAdder from "./CardNewFieldAdder";
import CardSameFieldUpdater from "./CardSameFieldUpdater";

interface Props {
  views: FieldType[] | undefined;
  fields: FieldType[];
  setter: any;
  card: CardTypes;
  side: "front" | "back";
}
function CardSidesEditor({ views, fields, setter, card, side }: Props) {
  return (
    <div className="flex-1 col_">
      {views?.map((view_) => {
        const field = fields?.find((f) => f.viewId === view_.viewId);

        if (!field) {
          return (
            <FieldItemWrapper key={view_.viewId} data={view_} view={view_}>
              <CardNewFieldAdder
                view_={view_}
                setter={setter}
                side={side}
                card={card}
              />
            </FieldItemWrapper>
          );
        }

        return (
          <FieldItemWrapper key={field.id} data={field} view={view_}>
            <CardSameFieldUpdater
              setter={setter}
              view={view_}
              data={field}
              card={card}
              side={side}
            />
          </FieldItemWrapper>
        );
      })}
    </div>
  );
}

export default CardSidesEditor;

const FieldItemWrapper = ({
  children,
  data,
  view,
}: {
  children: React.ReactNode;
  data: FieldType;
  view: FieldType;
}) => {
  const [show, setShow] = useState(false);
  const textStyle = " dark:text-slate-400";
  return (
    <div className="ring-1 p-2 rounded-xl dark:ring-slate-500">
      {children}
      <small
        className="dark:text-slate-400 cursor-pointer dark:hover:text-indigo-400 px-2 "
        onClick={() => setShow((p) => !p)}
      >
        {show ? "hide" : "show"} field's current data
      </small>
      {show && (
        <div className="text-[.8rem]  bg-slate-200 dark:bg-slate-600 p-2 rounded-lg">
          <p>
            <span className={textStyle}>text:</span> {data?.text}
          </p>
          <p>
            <span className={textStyle}>type:</span> {data?.type}
          </p>
          <p className="whitespace-nowrap" title={data?.value}>
            <span className={textStyle}>value:</span>{" "}
            {_charLimits(data?.value || "", 50)}
          </p>
        </div>
      )}
    </div>
  );
};
