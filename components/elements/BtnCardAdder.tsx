import React from "react";
import useWork from "../../features/work/useWork";
import { Plus } from "../../lib/icons";

export default function BtnCardAdder() {
  const { setContent } = useWork();
  return (
    <p
      onClick={() => setContent("cardadder")}
      className="flex items-center gap-1 px-3 mx-3 rounded-full ring-1 ring-slate-300 cursor-pointer hover:shadow-md text-slate-500"
    >
      <Plus />
      Card
    </p>
  );
}
