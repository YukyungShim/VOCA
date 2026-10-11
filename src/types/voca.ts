export interface WordDetail {
  pos: string;
  meaning: string;
}

export interface WordItem {
  id: string;
  num: number;
  word: string;
  details: WordDetail[];
  dateAdded: string;
  group: string; // 'ALL' | '248' | '900' | 'custom'
  isBookmarked?: boolean;
  isMastered?: boolean;
}

export interface RawVocaData {
  group_248?: Array<{
    num?: number;
    word: string;
    details: WordDetail[];
    dateAdded?: string;
  }>;
  group_900?: Array<{
    num?: number;
    word: string;
    details: WordDetail[];
    dateAdded?: string;
  }>;
}

export type SortMode = 'abc' | 'latest';
export type ViewMode = 'wordList' | 'quiz';
export type GroupType = 'ALL' | '248' | '900' | '숙어';
