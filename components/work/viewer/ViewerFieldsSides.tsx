import React from "react";
import { FieldType } from "../../../features/card/CardType";
import Divider from "../../elements/Divider";
import Input from "../../elements/Input";
import Toggle from "../../elements/Toggle";

interface Props {
  side: "fronts" | "backs";
  fields: FieldType[];
  setSides: any;
  setView: any;
}
function ViewerFieldsSides({ setView, setSides, side, fields }: Props) {
  return (
    <div className="py-1 flex-1 max-w-[200px]">
      <p className="text-[.9rem] text-accent">
        {side.charAt(0).toUpperCase() + side.slice(1, -1)} Fields
      </p>
      <Divider className="my-2" />
      {fields?.map((f: any) => (
        <div className="py-1" key={"" + f?.text + f?.type}>
          <Toggle
            value={f?.value}
            wide={true}
            text={f?.text}
            onToggle={(val) => setView(val, f, side, setSides)}
          />
        </div>
      ))}
    </div>
  );
}

export default ViewerFieldsSides;
