import { useQuery } from "@tanstack/react-query";
import { Voice, UserSettings } from "./types";
import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const useVoices = () => {
  return useQuery<Voice[]>({
    queryKey: ["voices"],
    queryFn: async () => {
      const { data } = await api.get<Voice[]>(API_ENDPOINTS.SETTINGS.VOICES);
      return data;
    },
  });
};

export const useUserSettings = () => {
  return useQuery<UserSettings>({
    queryKey: ["userSettings"],
    queryFn: async () => {
      const { data } = await api.get<UserSettings>(API_ENDPOINTS.SETTINGS.BASE);
      return data;
    },
  });
}; 