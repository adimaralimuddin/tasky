import { createSlice } from "@reduxjs/toolkit";

export interface QuizOptions {
  side: "fronts" | "backs" | "both";
  options: number[];
  hasChosen: boolean;
  singleWrong: boolean;
  speed: number;
  sound: boolean;
}

export type OptionCountType = 1 | 2 | 3 | 4 | 5 | 6;

const initialState: QuizOptions = {
  side: "fronts",
  options: [],
  hasChosen: false,
  singleWrong: false,
  speed: 0.5,
  sound: true,
};

export const quizOptionSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setHasChosen: (state, action) => {
      state.hasChosen = action.payload;
    },
    togHasChosen: (state) => {
      state.hasChosen = !state.hasChosen;
    },
    setSide: (state, action) => {
      state.side = action.payload;
    },
    togSide: (state) => {
      state.side = state.side == "backs" ? "fronts" : "backs";
    },
    setSingleWrong: (state, action) => {
      state.singleWrong = action.payload;
    },
    togSingleWrong: (state) => {
      state.singleWrong = !state.singleWrong;
    },
    setSpeed: (state, action) => {
      state.speed = action.payload;
    },
    setSound: (state, action) => {
      state.sound = action.payload;
    },
  },
});

export const {
  setHasChosen,
  togHasChosen,
  setSide,
  togSide,
  setSingleWrong,
  togSingleWrong,
  setSpeed,
  setSound,
} = quizOptionSlice.actions;
export default quizOptionSlice.reducer;
