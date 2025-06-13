import { useQuery } from "@tanstack/react-query";
import { LibraryBook, LibraryFilters, LibraryResponse } from "./types";
import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const useLibrary = (filters: LibraryFilters = {}, page = 1, pageSize = 10) => {
  return useQuery<LibraryResponse>({
    queryKey: ["library", filters, page, pageSize],
    queryFn: async () => {
      const { data } = await api.get<LibraryResponse>(API_ENDPOINTS.USER.LIBRARY, {
        params: {
          ...filters,
          page,
          pageSize,
        },
      });
      return data;
    },
  });
};

export const useBook = (bookId: string) => {
  return useQuery<LibraryBook>({
    queryKey: ["book", bookId],
    queryFn: async () => {
      const { data } = await api.get<LibraryBook>(`${API_ENDPOINTS.BOOKS.BASE}/${bookId}`);
      return data;
    },
    enabled: !!bookId,
  });
}; 