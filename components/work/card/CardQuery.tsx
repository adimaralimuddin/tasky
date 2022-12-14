import React, { useEffect, useState } from "react";
import { CardTypes, FieldType } from "../../../features/card/CardType";
import useTemplate from "../../../features/template/useTemplate";
import useWork from "../../../features/work/useWork";
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
    <div className="flex flex-wrap items-end gap-1 ">
      <span
        className="flex flex-col flex-1 hover:scale-[1.2] transition 
      cursor-pointer hover:shadow-lg  bg-white dark:bg-slate-700 p-1 rounded-lg 
      hover:ring-1 ring-slate-300  dark:ring-slate-400 hover:text-sm hover:p-3 min-w-[120px]"
      >
        <label htmlFor="">search</label>
        <input
          onInput={onSearchHandler}
          type="text"
          className="ring-1 px-2 m-0 p-0 w-full ring-slate-300 dark:ring-slate-500 outline-indigo-400 dark:outline-nond "
          placeholder={`search ${type} ${filter}`}
        />
      </span>
      <SelectItem
        value={filter}
        text="filter"
        onInput={(e: any) => setFilter(e.target.value)}
      >
        {fields?.[type]?.map((f: any) =>
          f?.type == "text" || f?.type == "number" ? (
            <option value={f?.text}>{f?.text}</option>
          ) : null
        )}
      </SelectItem>
      <SelectItem
        text="side"
        onInput={(e: any) => {
          setType(e.target.value);
          updateFilter(e.target.value);
        }}
      >
        <option value="fronts">fronts</option>
        <option value="backs">backs</option>
      </SelectItem>
      <CardQueryView />
    </div>
  );
}

function SelectItem({ children, onInput, text, value }: any) {
  return (
    <span className="flex flex-col hover:scale-[1.1]d transition cursor-pointer hover:shadow-lg p-1 rounded-lg hover:ring-1 ring-slate-200 dark:ring-slate-500  bg-white dark:bg-transparent">
      <label className="text-sm">{text}</label>
      <select
        className="m-0 p-0 ring-1 px-1 ring-slate-300 dark:ring-slate-500"
        name=""
        id=""
        onInput={onInput}
        value={value}
      >
        {children}
      </select>
    </span>
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
