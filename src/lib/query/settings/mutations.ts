import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UserSettings } from "./types";
import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: UserSettings) => {
      const { data: response } = await api.put(API_ENDPOINTS.SETTINGS.BASE, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["userSettings"] });
      toast.success("Settings updated successfully");
    },
    onError: () => {
      toast.error("Failed to update settings");
    },
  });
};

export const useDeleteAccount = () => {
  return useMutation({
    mutationFn: async () => {
      const { data } = await api.delete(API_ENDPOINTS.SETTINGS.DELETE);
      return data;
    },
    onSuccess: () => {
      toast.success("Account deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete account");
    },
  });
}; 