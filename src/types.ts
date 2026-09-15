export interface StoryPage {
  id: number;
  title: string;
  badge: string;
  storyText: string;
  dialogueQuote?: string;
  speaker?: string;
  bobocelExpression: 'sleepy' | 'curious' | 'surprised' | 'worried' | 'proud' | 'ecstatic';
  dayEquivalent: string;
  funFact: string;
  soundType: 'snore' | 'water' | 'crack' | 'sprout' | 'sun' | 'cheer';
}

export type GrowthStage = 0 | 1 | 2 | 4 | 7 | 14;

export interface GrowthStageDetail {
  day: GrowthStage;
  label: string;
  title: string;
  beanState: string;
  bobocelSpeech: string;
  scientificExplanation: string;
  gardenerTask: string;
}

export interface JournalEntry {
  id: string;
  dayNumber: number;
  date: string;
  gardenerNotes: string;
  moistureLevel: 'uscat' | 'umed-perfect' | 'prea-multa-apa';
  sunshine: 'soare-plin' | 'lumina-buna' | 'umbra';
  heightMm: number;
  rootSeen: boolean;
  stemSeen: boolean;
  selectedSticker: string;
  drawingUrl?: string;
}

export interface CraftStep {
  number: number;
  title: string;
  shortDesc: string;
  detailedText: string;
  funTip: string;
  iconName: string;
}

export interface GuidedQuestion {
  id: string;
  question: string;
  kidFriendlyPrompt: string;
  deepMeaning: string;
  answerHint: string;
}
