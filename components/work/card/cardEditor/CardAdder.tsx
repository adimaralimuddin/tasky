import { nanoid } from "nanoid";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import useFieldsGetter from "../../../../features/app/fields/useFieldsGetter";
import { FieldType } from "../../../../features/card/CardType";
import useCardAdder from "../../../../features/card/useCardAdder";
import ContentHeader from "../../../elements/ContentHeader";
import CardQueryView from "../../viewer/CardQueryView";
import { MemoizedFields } from "./CardAdderFields";
import CardEditormodeToggler from "./CardEditormodeToggler";

const CardLists = dynamic(() => import("../cardLists/CardLists"), {});

export default function CardAdder() {
  return (
    <div className="container_ flex-col animate-fadein">
      <ContentHeader extraPath="add cards" removeMiddlePaths={true} />
      <AdderItem />
      <CardLists cardIndex={true} />
    </div>
  );
}

export function AdderItem() {
  const [hasEmptyValue, setHasEmptyValue] = useState(false);
  const { fronts: fronts_, backs: backs_ } = useFieldsGetter().getFieldsRaw();
  const { addCard } = useCardAdder();
  const [updated, setUpdated] = useState(false);

  let frontSides = useMemo(() => fronts_, []);
  let backSides = useMemo(() => backs_, []);

  const onAddCardHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const formElem = e.target;

    const fronts = filterFields("front", formElem, fronts_);
    const backs = filterFields("back", formElem, backs_);

    if (fronts?.[0]?.value?.trim() === "" || backs?.[0]?.value?.trim() === "") {
      setHasEmptyValue(true);
      return;
    }

    const data = {
      name: "",
      description: "",
      fronts,
      backs,
    };

    addCard(data, () => {
      // clear fields from local storage and update fields
      setUpdated((p) => !p);
      fronts_?.forEach((f) => localStorage.removeItem(f.text + "front"));
      backs_?.map((f) => localStorage.removeItem(f.text + "back"));
    });
  };

  return (
    <div className="col_ py-2">
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
        {hasEmptyValue && (
          <h3
            onAnimationEnd={() => {
              setHasEmptyValue(false);
            }}
            className="text-warm animate-wiggle"
          >
            fronts and backs must not be empty!
          </h3>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 card card-shadow py-2 ">
          <MemoizedFields updated={updated} side="front" fields={frontSides} />
          <MemoizedFields updated={updated} side="back" fields={backSides} />
        </div>
        <small className="px-2">press "enter" to save.</small>
      </form>
    </div>
  );
}

function filterFields(type: "front" | "back", formElem: any, lists: any) {
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
}
