import { configureStore } from "@reduxjs/toolkit";
import topic from "./features/topic/topicSlice";
import work from "./features/work/workSlice";
import quiz from "./features/quiz/quizSlice";

export const store = configureStore({
  reducer: {
    topic,
    work,
    quiz,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
