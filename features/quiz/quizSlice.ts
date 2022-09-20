import { createSlice } from "@reduxjs/toolkit";

export interface quizState {
  optionsCount: number;
  playInd: number;
  finish: boolean;
  side: string;
  options: number[];
}

const initialState: quizState = {
  optionsCount: 4,
  playInd: 0,
  finish: false,
  side: "fronts",
  options: [],
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {},
});

export const {} = quizSlice.actions;
export default quizSlice.reducer;
