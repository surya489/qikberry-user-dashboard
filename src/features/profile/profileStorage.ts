import { env } from "@/config/env";

import { type UserProfile } from "./profileTypes";

export const PROFILE_STORAGE_KEY = "qikberry_profile";
export const AUTH_SESSION_KEY = "qikberry_session";
const LEGACY_AUTH_KEY = "user";

export const getDefaultProfile = (): UserProfile => ({
  username: env.demoUsername,
  password: env.demoPassword,
  avatar: null,
});

const parseProfile = (raw: string): UserProfile | null => {
  try {
    const parsed = JSON.parse(raw) as Partial<UserProfile>;

    if (
      typeof parsed.username === "string" &&
      typeof parsed.password === "string" &&
      (parsed.avatar === null || typeof parsed.avatar === "string")
    ) {
      return {
        username: parsed.username,
        password: parsed.password,
        avatar: parsed.avatar ?? null,
      };
    }
  } catch {
    return null;
  }

  return null;
};

export const loadProfile = (): UserProfile => {
  const storedProfile = localStorage.getItem(PROFILE_STORAGE_KEY);

  if (storedProfile) {
    const profile = parseProfile(storedProfile);
    if (profile) {
      return profile;
    }
  }

  const legacyUsername = localStorage.getItem(LEGACY_AUTH_KEY);
  const defaultProfile = getDefaultProfile();

  if (legacyUsername) {
    const migratedProfile: UserProfile = {
      ...defaultProfile,
      username: legacyUsername,
    };
    saveProfile(migratedProfile);
    localStorage.removeItem(LEGACY_AUTH_KEY);
    return migratedProfile;
  }

  saveProfile(defaultProfile);
  return defaultProfile;
};

export const saveProfile = (profile: UserProfile): void => {
  localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profile));
};

export const validateCredentials = (username: string, password: string): boolean => {
  const profile = loadProfile();
  return profile.username === username.trim() && profile.password === password;
};

export const getSessionUsername = (): string | null => {
  return localStorage.getItem(AUTH_SESSION_KEY);
};

export const setSessionUsername = (username: string): void => {
  localStorage.setItem(AUTH_SESSION_KEY, username);
};

export const clearSession = (): void => {
  localStorage.removeItem(AUTH_SESSION_KEY);
  localStorage.removeItem(LEGACY_AUTH_KEY);
};
