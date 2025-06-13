export interface UploadProgress {
  progress: number;
  status: "uploading" | "processing" | "completed" | "failed";
  error?: string;
}

export interface UploadResponse {
  bookId: string;
  title: string;
  status: "processing" | "completed" | "failed";
  error?: string;
}

export interface UploadOptions {
  title?: string;
  author?: string;
  description?: string;
  tags?: string[];
  voiceId?: string;
  audioQuality?: "standard" | "high" | "premium";
} 