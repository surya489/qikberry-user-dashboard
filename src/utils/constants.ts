export const ROUTES = {
  login: "/login",
  home: "/home",
  posts: "/home/posts",
  photos: "/home/photos",
  profile: "/home/profile",
} as const;

export const PREVIEW_COUNT = 6;
export const POSTS_PER_PAGE = 6;
export const PHOTOS_PER_PAGE = 10;
export const SEARCH_DEBOUNCE_MS = 400;
export const SCROLL_TOP_THRESHOLD = 400;
export const LOGIN_ERROR_DISMISS_MS = 4000;
