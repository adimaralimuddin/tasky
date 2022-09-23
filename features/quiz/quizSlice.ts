import { createSlice } from "@reduxjs/toolkit";
import ActionButtons from "../../components/elements/ActionButtons";

export interface quizState {
  side: string;
  options: number[];
  hasChosen: boolean;
  singleWrong: boolean;
  speed: number;
}

const initialState: quizState = {
  side: "fronts",
  options: [],
  hasChosen: false,
  singleWrong: false,
  speed: 0.5,
};

export const quizSlice = createSlice({
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
} = quizSlice.actions;
export default quizSlice.reducer;
