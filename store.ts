import { configureStore } from "@reduxjs/toolkit";
import app from "./features/app/appSlice";
import server from "./features/dateState/serverDataSlice";
import player from "./features/play/PlaySlice";
import quizOption from "./features/quiz/quizOptionSlice";
import topic from "./features/topic/topicSlice";
import viewer from "./features/viewer/viewerSlice";

export const store = configureStore({
  reducer: {
    app,
    topic,
    quizOption,
    server,
    viewer,
    player,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
