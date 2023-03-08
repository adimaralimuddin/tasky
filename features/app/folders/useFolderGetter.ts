import { useRouter } from "next/router";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";

function useFolderGetter() {
  const router = useRouter();
  const selectedFolderId = useSelector(
    (s: RootState) => s.app.selectedFolderId
  );

  const getSelectedFolder = () => {
    return selectedFolderId || router.query?.folderId;
  };

  const isFolderSelected = (
    folderId: string,
    yes_: string | boolean = true,
    no_: string | boolean = false
  ) => {
    return folderId === getSelectedFolder() ? yes_ : no_;
  };
  return { router, getSelectedFolder, isFolderSelected };
}

export default useFolderGetter;
