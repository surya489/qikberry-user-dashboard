import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type AuthState } from "./authTypes";

const getInitialState = (): AuthState => {
  const storedUser = localStorage.getItem("user");

  if (storedUser) {
    return {
      isAuthenticated: true,
      username: storedUser,
    };
  }

  return {
    isAuthenticated: false,
    username: "",
  };
};

const initialState = getInitialState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isAuthenticated = true;
      state.username = action.payload;

      localStorage.setItem("user", action.payload);
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.username = "";

      localStorage.removeItem("user");
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;