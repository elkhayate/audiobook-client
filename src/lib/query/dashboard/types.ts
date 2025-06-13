export interface DashboardStats {
  totalBooks: number;
  totalListeningTime: number;
  completedBooks: number;
  inProgressBooks: number;
  recentBooks: Book[];
  listeningHistory: ListeningHistory[];
}

export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
  duration: number;
  progress: number;
  status: "completed" | "in_progress" | "not_started";
  lastPlayedAt?: string;
}

export interface ListeningHistory {
  bookId: string;
  bookTitle: string;
  duration: number;
  timestamp: string;
} 