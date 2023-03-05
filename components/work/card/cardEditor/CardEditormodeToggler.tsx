import React from "react";
import { useDispatch, useSelector } from "react-redux";
import useViewer from "../../../../features/viewer/useViewer";
import { setEditorMod } from "../../../../features/viewer/viewerSlice";
import { RootState } from "../../../../store";

function CardEditormodeToggler() {
  const editorMode = useSelector((s: RootState) => s.viewer.editorMode);

  const patch = useDispatch();
  const onToggle = () => {
    patch(setEditorMod(!editorMode));
  };
  return (
    <div
      onClick={onToggle}
      className={
        "cursor-pointer p-1d select-none text-accent" +
        (editorMode ? " text-indigo-400 dark:text-indigo-400 " : " ")
      }
    >
      <small>editor mode {editorMode ? "on" : "off"}</small>
    </div>
  );
}

export default CardEditormodeToggler;
