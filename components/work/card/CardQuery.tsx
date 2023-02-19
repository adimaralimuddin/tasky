import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { CardTypes, FieldType } from "../../../features/card/CardType";
// import useTemplate from "../../../features/template/useTemplate";
import useTopicSelect from "../../../features/topic/useTopicSelect";
import { setFields } from "../../../features/work/workSlice";
// import useWork from "../../../features/work/useWork";
import _useWorkRoutes from "../../../lib/_routes/_useWorkRoutes";
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
  const { topic: topicCached, query } = _useWorkRoutes();
  const template = topicCached?.template;
  const dispatch = useDispatch();

  const setFieldsStore = (fields: { fronts: any[]; backs: any[] }) => {
    dispatch(setFields(fields));
  };

  const [type, setType] = useState("fronts");
  const [filter, setFilter] = useState("");
  const [fields, setFieldsViews] = useState<any>(templateFields(template));
  // const { selectTopic } = useTopicSelect();

  useEffect(() => {
    console.log("effect");
    const fields = templateFields(template);
    setFieldsViews(fields);
    setFilter(fields?.fronts?.[0]?.text);
    // selectTopic(topicCached);
    setFieldsStore(fields);
  }, [query]);

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
  const fronts = JSON?.parse(template?.fronts)?.map((f: FieldType) => ({
    ...f,
    view: true,
  }));
  const backs = JSON?.parse(template?.backs)?.map((f: FieldType) => ({
    ...f,
    view: true,
  }));

  const fields = {
    fronts,
    backs,
  };
  return fields;
};
