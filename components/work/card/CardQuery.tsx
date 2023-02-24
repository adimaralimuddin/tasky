import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useFieldsGetter from "../../../features/app/fields/useFieldsGetter";
import { CardTypes, FieldType } from "../../../features/card/CardType";
import SearchBox from "../../elements/SearchBox";
import Select from "../../elements/Select";
import CardQueryView from "./CardQueryView";

export default function CardQuery({
  cards,
  setCards,
}: {
  cards: CardTypes[];
  setCards: any;
  classId?: string;
}) {
  const { getFields } = useFieldsGetter();
  const template = getFields();

  const dispatch = useDispatch();

  const setFieldsStore = (fields: { fronts: any[]; backs: any[] }) => {
    // // work?.fronts?.find
    // const resolveFields = (side: "backs" | "fronts") =>
    //   fields?.[side]?.map((f) => {
    //     // this used to const stateField = work?.[side]
    //     const stateField = template?.[side]?.find(
    //       (f_) => f_?.text === f?.text && f_?.type === f?.type
    //     );
    //     const returnField = { view: true, ...f, ...stateField };
    //     return returnField;
    //   });
    // const fronts = resolveFields("fronts");
    // const backs = resolveFields("backs");
    // const returnFields = { fronts, backs };
    // console.log(`return fields here`, returnFields);
    // dispatch(setFields(returnFields));
  };

  const [type, setType] = useState<Side>("fronts");
  const [filter, setFilter] = useState(template?.fronts?.[0]?.text);

  const fields = template;

  const updateFilter = (type_: Side = type) => {
    const x = fields?.[type_]?.find((p: any) => p?.text == filter);
    if (!x) {
      setFilter(fields?.[type_]?.[0]?.text);
    }
  };

  const onSearchHandler = (e: any) => {
    const val = e.target.value?.toLowerCase();
    const newCards = cards?.filter((card: any) => {
      var ret = false;
      card?.[type]?.map((field: FieldType) => {
        if (field?.text == filter) {
          if (field?.value?.toLowerCase()?.includes(val)) {
            ret = true;
            return true;
          }
        }
      });
      return ret;
    });
    setCards(newCards);
  };

  return (
    <div className="flex flex-wrap gap-1 items-center">
      <SearchBox
        onInput={onSearchHandler}
        placeholder={`search type:${type} filter:${filter}`}
      />

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
            f?.type == "text" || f?.type == "number" ? true : null
          )
          ?.map((f: any) => [f?.text, f?.text])}
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
      <CardQueryView />
    </div>
  );
}

export const finalizeFields = (template: any) => {
  console.log(`finalize`, template);

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
