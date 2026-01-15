
export enum AppSection {
  LOGIN = 'login',
  SEARCH = 'search',
  FAVORITES = 'favorites',
  COMMUNITY = 'community',
  AI_ASSISTANT = 'ai_assistant',
  BUSINESS = 'business',
  STAR_BANK = 'star_bank'
}

export type ProcessTag = 'ID-SEC' | 'OPS-WORK' | 'AI-STRAT' | 'EXP-VIS' | 'ECO-DATA' | 'SOC-SYN';

export interface StarPackage {
  id: string;
  name: string;
  amount: string;
  price: string;
  bonus: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface InvestmentNode {
  id: string;
  title: string;
  description: string;
  cost: string;
  yield: string;
  level: number;
}

export interface ProcessStatus {
  tag: ProcessTag;
  label: string;
  status: 'active' | 'syncing' | 'standby';
  load: number; // 0-100
  color: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  processTag?: ProcessTag;
}

export interface TravelDestination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  rating: number;
  sustainabilityScore: number;
  priceLevel: '€' | '€€' | '€€€' | '€€€€';
}

// Added CommunityPost interface to fix the import error in Community.tsx
export interface CommunityPost {
  id: string;
  author: string;
  avatar: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  tags: string[];
}
