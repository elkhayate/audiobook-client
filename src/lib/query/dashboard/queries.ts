import { useQuery } from "@tanstack/react-query";
import { DashboardStats } from "./types";
import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const useDashboardStats = () => {
  return useQuery<DashboardStats>({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const { data } = await api.get<DashboardStats>(API_ENDPOINTS.USER.DASHBOARD);
      return data;
    },
  });
}; 