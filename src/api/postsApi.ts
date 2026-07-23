import api from "./axios";
import { type PostType } from "../types/post";

export const getPosts = async (): Promise<PostType[]> => {
  const response = await api.get<PostType[]>("/posts");
  return response.data;
};
