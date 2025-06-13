export interface Voice {
  voice_id: string;
  name: string;
  category?: string;
  description?: string;
  preview_url?: string;
  labels?: {
    accent?: string;
    gender?: string;
    descriptive?: string;
    age?: string;
    use_case?: string;
    language?: string;
  };
}

export interface UserSettings {
  fullName: string;
  email: string;
  audioQuality: "standard" | "high" | "premium";
  voiceId: string;
} 