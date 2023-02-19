import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { FieldType } from "../card/CardType";
import { TemplateType } from "../template/templateType";
import { TopicType } from "../topic/topicType";

type fieldVal = {
  text: string;
  value?: string;
  type: string;
};

export interface workType {
  content: string;
  selectedTopic?: TopicType;
  selectedCategory?: string;
  selectedFolder?: string;
  openTopicAdder: boolean;
  fronts?: fieldVal[];
  backs?: fieldVal[];
  textSize?: string;
  imageSize?: number | string;
  viewLebel?: boolean;
  viewLevel?: boolean;
  viewCategory?: boolean;
  quizType?: string;
  quizOptionNumber?: number;
  size: number;
}

const initialState: workType = {
  content: "dashboard",
  selectedCategory: "all",
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

export const workSlice = createSlice({
  name: "topic",
  initialState,
  reducers: {
    setTopic: (state, action: PayloadAction<TopicType>) => {
      const fields = templateFields(action.payload?.template);
      state.selectedTopic = action.payload;
      state.content = "topic";
      state.fronts = fields?.fronts;
      state.backs = fields?.backs;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
      state.content = "category";
    },
    setContent: (state, action) => {
      state.content = action.payload;
      if (action.payload == "quiz") {
        state.textSize = "text-sm";
        state.imageSize = 100;
      }
    },
    setOpenTopicAdder: (state, action) => {
      state.openTopicAdder = action.payload;
    },
    setSelectedFolder: (state, action) => {
      state.selectedFolder = action.payload;
    },
    setFields: (state, action) => {
      const { fronts, backs } = action.payload;
      state.fronts = fronts;
      state.backs = backs;
    },
    setFronts: (state, action) => {
      state.fronts = action.payload;
    },
    setBacks: (state, action) => {
      state.backs = action.payload;
    },
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

export const {
  setTopic,
  setCategory,
  setContent,
  setOpenTopicAdder,
  setSelectedFolder,
  setFields,
  setFronts,
  setBacks,
  setTextSize,
  setImageSize,
  setViewLebel,
  setViewLevel,
  setViewCategory,
  setQuizOptionNumber,
  setQuizType,
  setSize,
} = workSlice.actions;
export default workSlice.reducer;

function templateFields(template?: TemplateType) {
  if (!template) return;
  const fronts = JSON?.parse(template?.fronts)?.map((f: FieldType) => ({
    ...f,
    view: true,
  }));
  const backs = JSON?.parse(template?.backs)?.map((f: FieldType) => ({
    ...f,
    view: true,
  }));
  return {
    fronts,
    backs,
  };
}
