import api from "@/api/axios";
import type { PhotoType } from "@/types/photo";

export const getPhotos = async (): Promise<PhotoType[]> => {
  const { data } = await api.get<PhotoType[]>("/photos");
  return data;
};
