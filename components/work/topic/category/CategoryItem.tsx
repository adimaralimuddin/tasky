import React from "react";
import useCards from "../../../../features/card/useCards";
import useWork from "../../../../features/work/useWork";
import Box from "../../../elements/Box";

type props = {
  field: string;
  topicId?: string;
  classId?: string;
};

export default function CategoryItem({ field, topicId, classId }: props) {
  const { category } = useCards(topicId);
  const { setCategory } = useWork();
  const cards = category(field);
  return (
    <div>
      <Box
        onClick={() => setCategory(field)}
        css="flex-1 cursor-pointer ring-1 ring-slate-200 hover:-translate-y-[2px] transition ease-in-out duration-200 hover:shadow-lg"
      >
        <h3>{field}</h3>
        <p>{cards?.length} items</p>
      </Box>
    </div>
  );
}
