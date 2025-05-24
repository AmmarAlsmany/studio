export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: Date;
}

export type MoodScale = 1 | 2 | 3 | 4 | 5; // 1: Awful, 5: Great
export type SleepQuality = "poor" | "fair" | "good" | "excellent";
export type AppetiteLevel = "decreased" | "normal" | "increased";
export type ActivityLevel = "low" | "normal" | "high";
export type SocialEngagementLevel = "none" | "a_little" | "moderate" | "a_lot";

export interface SymptomEntry {
  id: string;
  date: Date;
  mood: MoodScale;
  sleepHours?: number;
  sleepQuality?: SleepQuality;
  appetite: AppetiteLevel;
  activity: ActivityLevel;
  socialEngagement: SocialEngagementLevel;
  journal?: string;
  userId: string; 
}

export interface EducationalResource {
  id: string;
  title: string;
  description: string;
  type: "video" | "article" | "link";
  url: string;
  thumbnailUrl?: string; // For videos or articles with images
  aiHint?: string; // For placeholder images
}
