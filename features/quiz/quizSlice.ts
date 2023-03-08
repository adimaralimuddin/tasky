import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cardSlice from "../card/cardSlice";
import { CardTypes } from "../card/CardType";

interface Quiz {
  playind: number;
  finish: boolean;
  quizCards: QuizResultType[];
  options: number[];
  optionCounts: OptionCountType;
}
export type OptionCountType = 1 | 2 | 3 | 4 | 5 | 6;
export type QuizResultType = {
  card: CardTypes;
  sorta: number;
  sortb: number;
  correct: any[];
  wrong: any[];
  answer: any[];
};

const initialState = {
  playind: 0,
  finish: false,
  optionCounts: 4,
} as Quiz;

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    setPlayInd: (state, action) => {
      state.playind = action.payload;
    },
    setFinish: (state, action) => {
      state.finish = action.payload;
    },

    setQuizCards: (state, action: PayloadAction<QuizResultType[]>) => {
      state.quizCards = action.payload.map(({ card, ...others }) => ({
        card: {
          ...card,
          fronts: [...(card?.fronts || [])],
          backs: [...(card?.backs || [])],
        },
        ...others,
      }));
    },
    reloadOptions: (state, action) => {
      const newOptions = generatePlayOptionsLists(
        state.optionCounts,
        action.payload,
        state.playind
      );
      console.log(`new options`, newOptions);
      state.options = newOptions;
    },
  },
});
export const quizActions = quizSlice.actions;
export default quizSlice.reducer;

function generatePlayOptionsLists(count = 3, length = 11, playInd = 0) {
  // run function return a random number from 0 to max
  const run = (max = length) => Math.floor(Math.random() * max);
  // create and store 30 random numbers
  let ret: number[] = [];
  for (let i = 1; i <= 30; i++) {
    let ran = run();
    ret.push(ran);
  }
  // exclude any number that is equal to playInd
  ret = ret.filter((i) => i != playInd);
  let x: any = new Set(ret);
  // make all numbers unique, also assign to unique variable
  let uniqued = [...x];
  // trim the 30 lists to just the option count, also assign to sliced variable
  let sliced = uniqued.slice(0, count - 1);
  // finally insert the playInd anywhere from the list index
  sliced.splice(run(count), 0, playInd);
  return sliced;
}
