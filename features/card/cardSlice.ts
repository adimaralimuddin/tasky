

import { createSlice } from "@reduxjs/toolkit";
import { TopicType } from "../topic/topicType";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface workState {
  selectedTopic?: TopicType;
  content: string;
  selectedCategory?: string;
}

const initialState: workState = {
  content: "dashboard",
  selectedCategory: "all",
};

export const cardSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<TopicType>) => {
      state.selectedTopic = action.payload;
      state.content = "topic";
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.content = "category";
    },
    setContent: (state, action) => {
      state.content = action.payload;
    },
  },
});

export const { setTopic, setCategory, setContent } = cardSlice.actions;
export default cardSlice.reducer;
