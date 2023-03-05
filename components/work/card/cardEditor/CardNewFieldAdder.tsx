import { nanoid } from "nanoid";
import React from "react";
import { CardTypes, FieldType } from "../../../../features/card/CardType";
import Input from "../../../elements/Input";
import CardFieldFileEditor from "./CardFieldFileEditor";

interface Props {
  view_: FieldType;
  setter: any;
  side: "front" | "back";
  card: CardTypes;
}
function CardNewFieldAdder({ view_, setter, side, card }: Props) {
  // extract view property to exclude/ rawView will be payload for fieldAdder
  const { view, ...rawView } = view_;

  const onInputHandler = (value: string | File | undefined) => {
    // this handler will work on any types of value, can be string, number or file
    // the type and value will be executed separately on the next execution
    setter((p: FieldType[]) => {
      const f = p?.find((p_) => p_?.viewId === view_?.viewId);

      // add new field when it is not in the list yet
      if (!f) {
        const newField = {
          ...rawView,
          value,
          [side + "Id"]: card.id, // this will result to either frontId or backId
          isNew: true, // add isNew property to for the next execution to come
          ind: p?.length || 0,
          id: nanoid(),
        };
        return [...p, newField];
      }

      // if there is field on the list already, update the value and then return it along the other fields
      return p.map((f_, ind) => {
        if (f_.viewId === view_.viewId) {
          return { ...f_, value, ind, [side + "Id"]: card.id };
        }
        return f_;
      });
    });
  };

  //   this blocks handles field with type of file
  if (view_.type === "image" || view_.type === "audio") {
    return (
      <CardFieldFileEditor
        view={view_}
        data={view_}
        onChange={(file) => onInputHandler(file)}
      />
    );
  }

  //   by default, return handler for field type of text or number
  return (
    <div>
      <Input
        onReset_={() => ""}
        onChange_={(val: string | File | undefined) => {
          onInputHandler(val);
        }}
        text={view_?.text}
        type={view_?.type || "text"}
      />
    </div>
  );
}

export default CardNewFieldAdder;
