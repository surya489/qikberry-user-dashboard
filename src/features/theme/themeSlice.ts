import { createSlice } from "@reduxjs/toolkit";

import { type ThemeMode, type ThemeState } from "./themeTypes";

const THEME_STORAGE_KEY = "theme";

const getInitialTheme = (): ThemeMode => {
  const stored = localStorage.getItem(THEME_STORAGE_KEY);

  if (stored === "light" || stored === "dark") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

const applyThemeClass = (mode: ThemeMode) => {
  document.documentElement.classList.toggle("dark", mode === "dark");
};

const initialMode = getInitialTheme();
applyThemeClass(initialMode);

const themeSlice = createSlice({
  name: "theme",
  initialState: { mode: initialMode } satisfies ThemeState,
  reducers: {
    setTheme: (state, action: { payload: ThemeMode }) => {
      state.mode = action.payload;
      localStorage.setItem(THEME_STORAGE_KEY, action.payload);
      applyThemeClass(action.payload);
    },
    toggleTheme: (state) => {
      const nextMode: ThemeMode = state.mode === "light" ? "dark" : "light";
      state.mode = nextMode;
      localStorage.setItem(THEME_STORAGE_KEY, nextMode);
      applyThemeClass(nextMode);
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
