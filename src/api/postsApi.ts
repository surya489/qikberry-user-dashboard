import api from "@/api/axios";
import type { PostType } from "@/types/post";

export const getPosts = async (): Promise<PostType[]> => {
  const { data } = await api.get<PostType[]>("/posts");
  return data;
};
