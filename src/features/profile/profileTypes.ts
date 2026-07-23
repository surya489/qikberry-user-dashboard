export interface UserProfile {
  username: string;
  password: string;
  avatar: string | null;
}

export interface ProfileState {
  username: string;
  avatar: string | null;
}
