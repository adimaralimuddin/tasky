import React from "react";
import useViewer from "../../../features/viewer/useViewer";
import Input from "../../elements/Input";
import Toggle from "../../elements/Toggle";

function ViewerFieldsVisibilities() {
  const viewer = useViewer();
  return (
    <div className="col_ gap-1 flex-1 ">
      <p className="text-center text-sm text-accent">Fields Visibility</p>
      <Toggle
        value={viewer.viewLebel}
        wide={true}
        text="lebel"
        onToggle={viewer.setViewLebel}
      />
      <Toggle
        value={viewer.viewLevel}
        wide={true}
        text="status"
        onToggle={viewer.setViewLevel}
      />
      <Toggle
        value={viewer.viewCategory}
        wide={true}
        text="category"
        onToggle={viewer.setviewCategory}
      />
    </div>
  );
}

export default ViewerFieldsVisibilities;
