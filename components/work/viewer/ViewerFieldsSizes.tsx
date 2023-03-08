import React from "react";
import useViewer from "../../../features/viewer/useViewer";
import Select from "../../elements/Select";

function ViewerFieldSizes() {
  const viewer = useViewer();
  return (
    <div className="flex-1  col_ gap-2">
      <p className="text-center text-accent text-sm text-slate-500">
        Fields Sizes
      </p>
      <Select
        text="Font Size"
        value={viewer.textSize}
        onInput={viewer.setTextSize}
        options={[
          ["normal", 2],
          ["small", 1],
          ["large", 3],
          ["xs", "0"],
          ["xl", 4],
        ]}
      />
      <Select
        text="Image Size"
        value={viewer.imageSize}
        onInput={viewer.setImageSize}
        options={[
          ["normal", 110],
          ["small", 80],
          ["large", 150],
          ["xl", 180],
        ]}
      />
    </div>
  );
}

export default ViewerFieldSizes;
