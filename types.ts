
export enum AppStatus {
  IDLE = 'idle',
  SCANNING = 'scanning',
  EXTRACTING = 'extracting',
  ANALYZING = 'analyzing',
  CUTTING = 'cutting',
  UPLOADING = 'uploading',
  COMPLETE = 'complete'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  isPro: boolean;
  youtubeConnected: boolean;
  tiktokConnected: boolean;
  igConnected: boolean;
}

export interface Clip {
  id: string;
  originalVideoId: string;
  title: string;
  thumbnail: string;
  timestamp: string;
  duration: string;
  platforms: string[];
  status: 'published' | 'pending' | 'draft';
  views?: number;
  viralReason?: string; // New field for AI justification
}

export interface AnalysisResult {
  segments: {
    start: number;
    end: number;
    hookTitle: string;
    description: string;
    viralityScore: number;
    viralReason: string; // New field for AI justification
  }[];
}
