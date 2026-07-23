import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import { loadProfile, saveProfile } from "./profileStorage";
import { type ProfileState, type UserProfile } from "./profileTypes";

const getInitialState = (): ProfileState => {
  const profile = loadProfile();

  return {
    username: profile.username,
    avatar: profile.avatar,
  };
};

const profileSlice = createSlice({
  name: "profile",
  initialState: getInitialState(),
  reducers: {
    hydrateProfile: (state) => {
      const profile = loadProfile();
      state.username = profile.username;
      state.avatar = profile.avatar;
    },
    updateProfile: (state, action: PayloadAction<UserProfile>) => {
      saveProfile(action.payload);
      state.username = action.payload.username;
      state.avatar = action.payload.avatar;
    },
  },
});

export const { hydrateProfile, updateProfile } = profileSlice.actions;

export default profileSlice.reducer;
