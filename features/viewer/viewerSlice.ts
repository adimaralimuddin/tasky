import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CategoryType, LevelType, SideType } from "../app/appSlice";

const initialState: ViewerType = {
  openTopicAdder: false,
  textSize: 2,
  imageSize: 100,
  viewLebel: true,
  viewLevel: false,
  viewCategory: false,
  quizType: "choice",
  quizOptionNumber: 4,
  size: 0,
  side: "both",
  category: "all",
  status: "all",
  editorMode: false,
};

const viewerSlice = createSlice({
  name: "viewer",
  initialState,
  reducers: {
    setTextSize: (state, action) => {
      state.textSize = action.payload;
    },
    setImageSize: (state, action) => {
      state.imageSize = action.payload;
    },
    setViewLebel: (state, action) => {
      state.viewLebel = action.payload;
    },
    setViewLevel: (state, action) => {
      state.viewLevel = action.payload;
    },
    setViewCategory: (state, action) => {
      state.viewCategory = action.payload;
    },
    setQuizType: (state, action) => {
      state.quizType = action.payload;
    },
    setQuizOptionNumber: (state, action) => {
      state.quizOptionNumber = action.payload;
    },
    setSize: (state, action) => {
      state.size = action.payload;
    },
    setSide: (state, action: PayloadAction<SideType>) => {
      state.side = action.payload;
    },
    setCategory: (state, action: PayloadAction<CategoryType>) => {
      state.category = action.payload;
    },
    setStatus: (state, action: PayloadAction<LevelType>) => {
      state.status = action.payload;
    },
    setEditorMod: (state, action: PayloadAction<boolean>) => {
      state.editorMode = action.payload;
    },
  },
});

export const viewerActions = viewerSlice.actions;
export const setEditorMod = viewerSlice.actions.setEditorMod;

export default viewerSlice.reducer;

export interface ViewerType {
  openTopicAdder: boolean;
  textSize: number;
  imageSize: number | string;
  viewLebel: boolean;
  viewLevel: boolean;
  viewCategory: boolean;
  quizType: string;
  quizOptionNumber: number;
  size: number;
  side: SideType;
  status: LevelType;
  category: CategoryType;
  editorMode: boolean;
}
