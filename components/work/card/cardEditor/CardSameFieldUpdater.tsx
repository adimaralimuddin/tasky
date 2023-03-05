import React from "react";
import { CardTypes, FieldType } from "../../../../features/card/CardType";
import CardFieldEditor from "./CardFieldEditor";
import CardFieldFileEditor from "./CardFieldFileEditor";

interface Props {
  view: FieldType;
  data: FieldType;
  card: CardTypes;
  side: "front" | "back";
  setter: (fields: FieldType[]) => FieldType[];
}
function CardSameFieldUpdater({ setter, view, data, card, side }: Props) {
  const onChangeHandler = (val: File | String | undefined) => {};
  if (view.type === "image" || view.type === "audio") {
    return (
      <div>
        <CardFieldFileEditor
          view={view}
          data={data}
          setter={setter}
          onChange={onChangeHandler}
        />
      </div>
    );
  }

  return (
    <div>
      <CardFieldEditor
        card={card}
        side={side}
        data={data}
        view={view}
        setter={setter}
      />
    </div>
  );
}

export default CardSameFieldUpdater;
