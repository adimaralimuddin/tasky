import { configureStore } from "@reduxjs/toolkit";
import app from "./features/app/appSlice";
import server from "./features/dateState/serverDataSlice";
import quiz from "./features/quiz/quizSlice";
import topic from "./features/topic/topicSlice";
import viewer from "./features/viewer/viewerSlice";

export const store = configureStore({
  reducer: {
    app,
    topic,
    quiz,
    server,
    viewer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
