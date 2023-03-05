import React from "react";
import useViewer from "../../../features/viewer/useViewer";
import Select from "../../elements/Select";

function ViewerOtherOptionsA() {
  const viewer = useViewer();
  return (
    <div className=" col_ gap-2 justify-center flex-1">
      <Select
        text="show sides"
        value={viewer.side}
        onInput={viewer.setSide}
        options={[
          ["both", "both"],
          ["backs", "backs"],
          ["fronts", "fronts"],
        ]}
      />
      <Select
        text="filter status"
        value={viewer.status}
        onInput={viewer.setStatus}
        options={[
          ["all", "all"],
          ["remembered", "easy"],
          ["repeated", "normal"],
          ["forgoten", "hard"],
        ]}
      />
      <Select
        text="filter categories"
        value={viewer.category}
        onInput={viewer.setViewCategory}
        options={[
          ["all", "all"],
          ["new", "new"],
          ["completed", "passed"],
          ["remaining", "left"],
        ]}
      />
    </div>
  );
}

export default ViewerOtherOptionsA;
