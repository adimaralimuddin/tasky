import { createSlice } from "@reduxjs/toolkit";

export interface topicState {
  value: number;
}

const initialState: topicState = {
  value: 2,
};

export const topicSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },
  },
});

export const { increment, incrementByAmount } = topicSlice.actions;
export default topicSlice.reducer;
