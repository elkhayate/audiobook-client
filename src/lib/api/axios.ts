import axios from "axios";
import { supabase } from "../supabase/client";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config: any) => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;
    
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response: any) => response,
  async (error) => {
    if (error.response?.status === 401) {
      const { data: { session } } = await supabase.auth.refreshSession();
      
      if (!session) {
        window.location.href = "/login";
        return Promise.reject(error);
      }

      const originalRequest = error.config;
      originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
      
      try {
        return await api(originalRequest);
      } catch {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export default api;