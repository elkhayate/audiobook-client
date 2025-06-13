"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { getAuthHeader } from "@/lib/supabase/client";
import { toast } from "react-toastify";
import React from "react";
import { supabase } from "@/lib/supabase/client";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
      staleTime: 2000,
    },
    mutations: {
      onError: (error: any) => {
        toast.error(error?.message || "An error occurred while mutating data");
      },
    },
  },
});

export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const authHeader = await getAuthHeader();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeader,
      ...(options.headers || {}),
    },
  });

  if (response.status === 401) {
    const { data: { session }, error } = await supabase.auth.refreshSession();
    
    if (error || !session) {
      window.location.href = '/login';
      throw new Error('Authentication failed. Please log in again.');
    }
    
    const newAuthHeader = await getAuthHeader();
    const retryResponse = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...newAuthHeader,
        ...(options.headers || {}),
      },
    });
    
    if (!retryResponse.ok) {
      const errorData = await retryResponse.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${retryResponse.status}`);
    }
    return retryResponse.json();
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export function QueryProvider({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}

export { queryClient }; 