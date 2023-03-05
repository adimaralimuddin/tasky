import React, { useState } from "react";
import useFieldsGetter from "../../../features/app/fields/useFieldsGetter";
import { CardTypes, FieldType } from "../../../features/card/CardType";
import SearchBox from "../../elements/SearchBox";
import Select from "../../elements/Select";
import CardQueryView from "../viewer/CardQueryView";

export default function CardQuery({
  cards,
  setCards,
  children,
}: {
  cards: CardTypes[];
  setCards: any;
  classId?: string;
  children?: React.ReactNode;
}) {
  const { getFields } = useFieldsGetter();
  const template = getFields();

  const [type, setType] = useState<Side>("fronts");
  const [filter, setFilter] = useState(template?.fronts?.[0]?.viewId);
  // console.log(`filterssssss`, filter);

  const fields = template;
  // console.log(`fields`,fields);

  const updateFilter = (type_: Side = type) => {
    const x = fields?.[type_]?.find((p: any) => p?.text == filter);
    if (!x) {
      setFilter(fields?.[type_]?.[0]?.viewId);
    }
  };

  const onSearchHandler = (e: any) => {
    // console.log(`all cards`, cards);

    const val = e.target.value?.toLowerCase();

    if (val?.trim() === "") {
      setCards(cards);
      return;
    }
    // console.log(`val`, val);
    console.log(`filter`, filter);
    const newCards = cards?.filter((card: any) => {
      var ret = false;
      card?.[type]?.map((field: FieldType) => {
        if (field?.viewId == filter) {
          if (field?.value?.toLowerCase()?.includes(val)) {
            ret = true;
            return true;
          }
        }
      });
      return ret;
    });

    console.log(`bew cards`, newCards);

    setCards(newCards);
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <SearchBox onInput={onSearchHandler} placeholder={`search . . . `} />

      <Select
        text="filter"
        value={filter}
        onInput={(side: string) => {
          setFilter(side);
          // setType(side);
          // updateFilter(side);
        }}
        options={fields?.[type]
          ?.filter((f: any) =>
            f?.type === "text" || f?.type == "number" ? true : null
          )
          ?.map((f: any) => [f?.text, f?.viewId])}
      />

      <Select
        onInput={(side: Side) => {
          setType(side);
          updateFilter(side);
        }}
        text="Side"
        options={[
          ["fronts", "fronts"],
          ["backs", "backs"],
        ]}
      />
      <CardQueryView right={true} />
      {children}
    </div>
  );
}

export const finalizeFields = (template: any) => {
  let fronts = template?.fronts || [];
  let backs = template?.backs || [];

  const isString = () => (typeof fronts === "string" ? true : false);

  if (isString()) {
    fronts = JSON?.parse(template?.fronts)?.map((f: FieldType) => ({
      ...f,
      view: true,
    }));
  }

  if (isString()) {
    backs = JSON?.parse(template?.backs)?.map((f: FieldType) => ({
      ...f,
      view: true,
    }));
  }
  const fields = {
    fronts,
    backs,
  };
  return fields;
};

type Side = "fronts" | "backs";
