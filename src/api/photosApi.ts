import api from "./axios";
import { type PhotoType } from "../types/photo";

export const getPhotos = async (): Promise<PhotoType[]> => {
  const response = await api.get<PhotoType[]>("/photos");
  return response.data;
};
