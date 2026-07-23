import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";
import profileReducer from "../features/profile/profileSlice";
import themeReducer from "../features/theme/themeSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    theme: themeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
