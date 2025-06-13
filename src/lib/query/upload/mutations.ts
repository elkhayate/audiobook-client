import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { UploadResponse, UploadOptions } from "./types";
import api from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/lib/api/endpoints";

export const useUploadBook = () => {
  const queryClient = useQueryClient();

  return useMutation<UploadResponse, Error, { file: File; options: UploadOptions }>({
    mutationFn: async ({ file, options }) => {
      const formData = new FormData();
      formData.append("file", file);
      
      Object.entries(options).forEach(([key, value]) => {
        if (value !== undefined) {
          formData.append(key, Array.isArray(value) ? JSON.stringify(value) : value);
        }
      });

      const { data } = await api.post<UploadResponse>(API_ENDPOINTS.BOOKS.UPLOAD, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
      toast.success("Book uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to upload book");
    },
  });
};

export const useConvertBook = () => {
  const queryClient = useQueryClient();

  return useMutation<UploadResponse, Error, { bookId: string; options: UploadOptions }>({
    mutationFn: async ({ bookId, options }) => {
      const { data } = await api.post<UploadResponse>(
        API_ENDPOINTS.BOOKS.CONVERT(bookId),
        options
      );
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["library"] });
      toast.success("Book conversion started");
    },
    onError: (error) => {
      toast.error(error.message || "Failed to start book conversion");
    },
  });
}; 