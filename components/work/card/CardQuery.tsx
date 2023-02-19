import React, { useEffect, useState } from "react";
import { CardTypes, FieldType } from "../../../features/card/CardType";
import useTemplate from "../../../features/template/useTemplate";
import useWork from "../../../features/work/useWork";
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
  const { work } = useWork();
  const { selectedTopic: topic } = work;
  const { template } = useTemplate(topic?.templateId);
  const [type, setType] = useState("fronts");
  const [filter, setFilter] = useState("");
  const [fields, setFields] = useState<any>(templateFields(template));

  useEffect(() => {
    const fields = templateFields(template);
    setFields(fields);
    setFilter(fields?.fronts?.[0]?.text);
  }, [work?.selectedTopic?.id]);

  const updateFilter = (type_ = type) => {
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
        placeholder={`search ${type} ${filter}`}
      />

      <Select
        onInput={(side: string) => {
          setType(side);
          updateFilter(side);
        }}
        text="filter"
        options={fields?.[type]
          ?.filter((f: any) =>
            f?.type == "text" || f?.type == "number" ? true : null
          )
          .map((f: any) => [f?.text, f?.text])}
      />

      <Select
        onInput={(side: string) => {
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

export const templateFields = (template: any) => {
  if (!template?.data) return;
  const fronts = JSON?.parse(template?.data?.fronts)?.map((f: FieldType) => ({
    ...f,
    view: true,
  }));
  const backs = JSON?.parse(template?.data?.backs)?.map((f: FieldType) => ({
    ...f,
    view: true,
  }));
  return {
    fronts,
    backs,
  };
};
