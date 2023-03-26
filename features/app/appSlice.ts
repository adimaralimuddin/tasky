import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FieldType } from "../card/CardType";
import { TemplateType } from "../template/templateType";
import { TopicType } from "../topic/topicType";

const initialState: AppStateType = {
  //selectedTopic,selectedFolderId, fronts,backs, content
  topicAdderOpenState: false,
  // content: "dashboard",
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    selectTopic(
      state,
      action: PayloadAction<{
        topic: TopicType;
        content?: ContentType;
        category?: CategoryType;
      }>
    ) {
      const { topic, content = "topic", category = "all" } = action.payload;

      const fields = templateFields(topic?.template);

      state.selectedTopic = topic;
      state.content = content;
      state.selectedCategory = category;
      state.fronts = fields?.fronts;
      state.backs = fields?.backs;
    },

    // set Content
    setContent(state, action: PayloadAction<ContentType>) {
      state.content = action.payload;
    },

    //  set content with category, can call on play, or any
    setContCat(
      state,
      action: PayloadAction<{ content: ContentType; category: CategoryType }>
    ) {
      state.content = action.payload.content;
      state.selectedCategory = action.payload.category;
    },

    // select category, when click on category item
    selectCategory(state, action: PayloadAction<CategoryType>) {
      state.content = "category";
      state.selectedCategory = action.payload;
    },
    // setFronts, set on cardQueryView
    setFronts: (state, action) => {
      state.fronts = action.payload;
    },
    // setBacks, set on cardQueryView
    setBacks: (state, action) => {
      state.backs = action.payload;
    },

    // toAddTopic, call on folder add topic option, get on topic adder
    toAddTopic(state, action: PayloadAction<string>) {
      //  assign the selected folderid
      state.selectedFolderId = action.payload;
      // open the topic adder to add topic with the selected folder
      state.topicAdderOpenState = true;
    },

    // set the state of topic adder to either show or hide
    setTopicOpenState(state, action: PayloadAction<boolean>) {
      state.topicAdderOpenState = action.payload;
    },

    // set what current folder is selected. set and get only on folder select,deselect
    setSelectedFolderId(state, action: PayloadAction<string>) {
      state.selectedFolderId = action.payload;
    },
  },
});

export const {
  selectTopic,
  setContent,
  selectCategory,
  setFronts,
  setBacks,
  toAddTopic,
  setTopicOpenState,
  setContCat,
  setSelectedFolderId,
} = appSlice.actions;
export default appSlice.reducer;

export type AppStateType = {
  content?: ContentType;
  selectedTopic?: TopicType;
  selectedCategory?: CategoryType;
  fronts?: FieldType[];
  backs?: FieldType[];
  selectedFolderId?: string;
  topicAdderOpenState: boolean;
};

export type ContentType =
  | "topic"
  | "category"
  | "dashboard"
  | "cardadder"
  | "play"
  | "quiz";

export type CategoryType = "all" | "new" | "passed" | "left" | undefined;
export type LevelType = "all" | "easy" | "normal" | "hard";
export type SideType = "both" | "fronts" | "backs" | "front" | "back";

export type DashboardType = {
  category: "new" | "passed" | "left";
  level: "easy" | "normal" | "hard";
  _count: { id: number };
};

export function templateFields(template?: TemplateType, view: boolean = true) {
  if (template && template?.fronts && template?.backs) {
    const fronts =
      typeof template?.fronts === "string"
        ? JSON?.parse(template.fronts).map((f: FieldType) => ({
            ...f,
            view,
          }))
        : template?.fronts;
    const backs =
      typeof template.backs === "string"
        ? JSON?.parse(template?.backs).map((f: FieldType) => ({
            ...f,
            view,
          }))
        : template?.backs;
    return {
      ...template,
      fronts,
      backs,
    };
  }
  return { ...template, noVal: true };
}
