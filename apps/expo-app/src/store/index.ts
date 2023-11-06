import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./feature/auth";
import { selectorReducer } from "./feature/selector";
import { resourcesReducer } from "./feature/resources";
import { assetReducer } from "./feature/asset";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    selector: selectorReducer,
    resources: resourcesReducer,
    asset: assetReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
