export type MBTIType = 
  | "ENFP" | "ENFJ" | "ENTP" | "ENTJ"
  | "ESFP" | "ESFJ" | "ESTP" | "ESTJ"
  | "INFP" | "INFJ" | "INTP" | "INTJ"
  | "ISFP" | "ISFJ" | "ISTP" | "ISTJ";

export interface MBTITypeInfo {
  code: MBTIType;
  name: string;
  description: string;
  traits: {
    strengths: string[];
    weaknesses: string[];
    keywords: string[];
  };
  datingStyle: {
    approach: string;
    values: string[];
    preferences: string[];
  };
  communicationStyle: {
    style: string;
    conflictResolution: string;
    expressiveness: string;
  };
}

export interface CompatibilityResult {
  type1: MBTIType;
  type2: MBTIType;
  score: number;
  analysis: {
    description: string;
    emotional: string;
    intellectual: string;
    practical: string;
  };
  strengths: string[];
  challenges: string[];
  advice: string[];
}

export interface BalanceGameQuestion {
  id: string;
  question: string;
  optionA: {
    text: string;
    image: string;
    traits: string[];
  };
  optionB: {
    text: string;
    image: string;
    traits: string[];
  };
}

export interface BalanceGameResult {
  sessionId: string;
  gameType: string;
  answers: Record<string, string>;
  resultType?: string;
  score?: number;
}

export type Language = "ko" | "en" | "jp";
