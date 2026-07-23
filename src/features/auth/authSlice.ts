import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import {
  clearSession,
  getSessionUsername,
  setSessionUsername,
} from "../profile/profileStorage";
import { type AuthState } from "./authTypes";

const getInitialState = (): AuthState => {
  const sessionUsername = getSessionUsername();

  if (sessionUsername) {
    return {
      isAuthenticated: true,
      username: sessionUsername,
    };
  }

  return {
    isAuthenticated: false,
    username: "",
  };
};

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;
      setSessionUsername(action.payload);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";
      clearSession();
    },
    syncAuthUsername: (state, action: PayloadAction<string>) => {
      if (state.isAuthenticated) {
        state.username = action.payload;
        setSessionUsername(action.payload);
      }
    },
  },
});

export const { login, logout, syncAuthUsername } = authSlice.actions;

export default authSlice.reducer;
