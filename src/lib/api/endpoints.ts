export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/logout",
    REFRESH: "/auth/refresh",
  },
  
  SETTINGS: {
    BASE: "/settings",
    VOICES: "/settings/voices",
    ACCOUNT: "/settings/account",
    DELETE: "/settings",
  },
  
  BOOKS: {
    BASE: "/books",
    UPLOAD: "/books/upload",
    CONVERT: (bookId: string) => `/books/${bookId}/convert`,
    DOWNLOAD: (bookId: string) => `/books/${bookId}/download`,
  },
  
  USER: {
    PROFILE: "/user/profile",
    LIBRARY: "/user/library",
    FAVORITES: "/user/favorites",
    DASHBOARD: "/user/dashboard",
  },
} as const; 