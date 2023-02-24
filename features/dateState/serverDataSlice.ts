import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { DashboardType } from "../app/appSlice";
import { ClassType } from "../class/classTypes";
import { FolderType } from "../folder/folderTypes";
import { TemplateType } from "../template/templateType";

export interface ServerDataType {
  class_: ClassType;
  dashboard: DashboardType[];
  folders: FolderType[];
  template: TemplateType;
}

const initialState = {} as ServerDataType;
const serverDataSlice = createSlice({
  name: "serverData",
  initialState,
  reducers: {
    // set class
    setClass(state, action: PayloadAction<ClassType>) {
      state.class_ = action.payload;
    },

    // set dashboard
    setDashboard(state, action: PayloadAction<DashboardType[]>) {
      state.dashboard = action.payload;
    },

    // set folders with suc topics and sub classes,fronts & backs all nested down
    setFolders(state, action: PayloadAction<FolderType[]>) {
      const folder = action.payload;
      state.folders = folder;
    },

    // set template like when topic is selected
    setTemplate(state, action: PayloadAction<TemplateType>) {
      state.template = action.payload;
    },
  },
});

export const { setClass, setDashboard, setFolders,setTemplate } = serverDataSlice.actions;
export default serverDataSlice.reducer;
