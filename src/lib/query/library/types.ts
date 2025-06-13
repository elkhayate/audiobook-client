export interface LibraryBook {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  duration: number;
  progress: number;
  status: "completed" | "in_progress" | "not_started";
  lastPlayedAt?: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  description?: string;
}

export interface LibraryFilters {
  status?: "completed" | "in_progress" | "not_started";
  search?: string;
  tags?: string[];
  sortBy?: "title" | "author" | "createdAt" | "lastPlayedAt";
  sortOrder?: "asc" | "desc";
}

export interface LibraryResponse {
  books: LibraryBook[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
} 