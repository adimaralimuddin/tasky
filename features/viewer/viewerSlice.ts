import { createSlice } from "@reduxjs/toolkit";

const initialState: ViewerType = {
  openTopicAdder: false,
  textSize: "",
  imageSize: 100,
  viewLebel: true,
  viewLevel: false,
  viewCategory: false,
  quizType: "choice",
  quizOptionNumber: 4,
  size: 0,
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
  },
});

export const viewerActions = viewerSlice.actions;
export default viewerSlice.reducer;

export interface ViewerType {
  openTopicAdder: boolean;
  textSize?: string;
  imageSize?: number | string;
  viewLebel?: boolean;
  viewLevel?: boolean;
  viewCategory?: boolean;
  quizType?: string;
  quizOptionNumber?: number;
  size: number;
}
