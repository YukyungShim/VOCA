'use client';

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import { WordItem, SortMode, ViewMode, GroupType, RawVocaData } from '../types/voca';
import staticData from '../data/teps_voca_data.json';

interface VocaContextType {
  isLoading: boolean;
  allWords: WordItem[];
  filteredWords: WordItem[];
  totalCount: number;
  count248: number;
  count900: number;
  selectedGroup: GroupType;
  sortMode: SortMode;
  viewMode: ViewMode;
  searchQuery: string;
  onlyBookmarked: boolean;
  selectedWordIndex: number | null;
  selectedWord: WordItem | null;
  isDrawerOpen: boolean;
  isAddModalOpen: boolean;
  isFrameMode: boolean;

  setSelectedGroup: (group: GroupType) => void;
  setSortMode: (mode: SortMode) => void;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  toggleOnlyBookmarked: () => void;
  toggleBookmark: (id: string) => void;
  addCustomWord: (word: string, pos: string, meaning: string) => void;
  openDetail: (index: number) => void;
  closeDetail: () => void;
  nextDetailWord: () => void;
  prevDetailWord: () => void;
  toggleDrawer: (open?: boolean) => void;
  toggleAddModal: (open?: boolean) => void;
  toggleFrameMode: () => void;
}

const VocaContext = createContext<VocaContextType | undefined>(undefined);

export function VocaProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);
  const [allWords, setAllWords] = useState<WordItem[]>([]);
  const [words248, setWords248] = useState<WordItem[]>([]);
  const [words900, setWords900] = useState<WordItem[]>([]);
  const [customWords, setCustomWords] = useState<WordItem[]>([]);
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());

  const [selectedGroup, setSelectedGroup] = useState<GroupType>('ALL');
  const [sortMode, setSortMode] = useState<SortMode>('abc');
  const [viewMode, setViewMode] = useState<ViewMode>('wordList');
  const [searchQuery, setSearchQuery] = useState('');
  const [onlyBookmarked, setOnlyBookmarked] = useState(false);
  const [selectedWordIndex, setSelectedWordIndex] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isFrameMode, setIsFrameMode] = useState(true);

  // Initialize data and localStorage
  useEffect(() => {
    try {
      // 1. Load bookmarks from localStorage
      const savedBookmarks = localStorage.getItem('teps_voca_bookmarks');
      const initialBookmarks = new Set<string>(savedBookmarks ? JSON.parse(savedBookmarks) : []);
      setBookmarkedIds(initialBookmarks);

      // 2. Load custom words
      const savedCustom = localStorage.getItem('teps_voca_custom_words');
      const loadedCustom: WordItem[] = savedCustom ? JSON.parse(savedCustom) : [];
      setCustomWords(loadedCustom);

      // 3. Process static json data
      const raw = staticData as RawVocaData;
      const list248: WordItem[] = (raw.group_248 || []).map((item, idx) => ({
        id: `248_${item.word}_${item.num || idx + 1}`,
        num: item.num ?? idx + 1,
        word: item.word,
        details: item.details || [],
        dateAdded: item.dateAdded || '26.03.30',
        group: '248',
        isBookmarked: initialBookmarks.has(`248_${item.word}_${item.num || idx + 1}`) || initialBookmarks.has(item.word.toLowerCase()),
      }));

      const list900: WordItem[] = (raw.group_900 || []).map((item, idx) => ({
        id: `900_${item.word}_${item.num || idx + 1}`,
        num: item.num ?? idx + 1,
        word: item.word,
        details: item.details || [],
        dateAdded: item.dateAdded || '26.03.30',
        group: '900',
        isBookmarked: initialBookmarks.has(`900_${item.word}_${item.num || idx + 1}`) || initialBookmarks.has(item.word.toLowerCase()),
      }));

      setWords248(list248);
      setWords900(list900);

      // Combine for 'ALL'
      const combinedMap = new Map<string, WordItem>();
      list248.forEach(w => combinedMap.set(w.word.toLowerCase(), w));
      list900.forEach(w => {
        if (!combinedMap.has(w.word.toLowerCase())) {
          combinedMap.set(w.word.toLowerCase(), w);
        }
      });
      loadedCustom.forEach(w => {
        combinedMap.set(w.word.toLowerCase(), w);
      });

      setAllWords(Array.from(combinedMap.values()));
    } catch (e) {
      console.error('Failed to initialize vocabulary data:', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Save bookmarks
  const toggleBookmark = (id: string) => {
    setBookmarkedIds(prev => {
      const next = new Set(prev);
      const isBookmarked = next.has(id);
      if (isBookmarked) {
        next.delete(id);
      } else {
        next.add(id);
      }
      localStorage.setItem('teps_voca_bookmarks', JSON.stringify(Array.from(next)));
      return next;
    });

    setAllWords(prev =>
      prev.map(w => (w.id === id ? { ...w, isBookmarked: !w.isBookmarked } : w))
    );
    setWords248(prev =>
      prev.map(w => (w.id === id ? { ...w, isBookmarked: !w.isBookmarked } : w))
    );
    setWords900(prev =>
      prev.map(w => (w.id === id ? { ...w, isBookmarked: !w.isBookmarked } : w))
    );
    setCustomWords(prev =>
      prev.map(w => (w.id === id ? { ...w, isBookmarked: !w.isBookmarked } : w))
    );
  };

  // Add custom word
  const addCustomWord = (word: string, pos: string, meaning: string) => {
    const now = new Date();
    const dateStr = `${String(now.getFullYear()).slice(2)}.${String(now.getMonth() + 1).padStart(2, '0')}.${String(now.getDate()).padStart(2, '0')}`;
    const newId = `custom_${Date.now()}`;
    const newItem: WordItem = {
      id: newId,
      num: 0,
      word: word.trim(),
      details: [{ pos: pos.trim() || '명사', meaning: meaning.trim() }],
      dateAdded: dateStr,
      group: 'custom',
      isBookmarked: false,
    };

    const nextCustom = [newItem, ...customWords];
    setCustomWords(nextCustom);
    localStorage.setItem('teps_voca_custom_words', JSON.stringify(nextCustom));

    setAllWords(prev => [newItem, ...prev]);
  };

  // Filtered and Sorted Words
  const filteredWords = useMemo(() => {
    let source: WordItem[] = [];
    if (selectedGroup === '248') {
      source = [...words248];
    } else if (selectedGroup === '900') {
      source = [...words900];
    } else if (selectedGroup === '숙어') {
      source = allWords.filter(w => w.word.includes(' ') || w.details.some(d => d.meaning.includes('숙어')));
    } else {
      source = [...allWords];
    }

    if (onlyBookmarked) {
      source = source.filter(w => bookmarkedIds.has(w.id) || w.isBookmarked);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      source = source.filter(w => {
        const wordMatch = w.word.toLowerCase().includes(q);
        const meaningMatch = w.details.some(d => d.meaning.toLowerCase().includes(q));
        return wordMatch || meaningMatch;
      });
    }

    if (sortMode === 'abc') {
      source.sort((a, b) => a.word.toLowerCase().localeCompare(b.word.toLowerCase()));
    } else {
      source.sort((a, b) => a.num - b.num);
    }

    return source;
  }, [allWords, words248, words900, selectedGroup, onlyBookmarked, searchQuery, sortMode, bookmarkedIds]);

  const selectedWord = selectedWordIndex !== null && filteredWords[selectedWordIndex]
    ? filteredWords[selectedWordIndex]
    : null;

  const openDetail = (index: number) => {
    setSelectedWordIndex(index);
  };

  const closeDetail = () => {
    setSelectedWordIndex(null);
  };

  const nextDetailWord = () => {
    if (selectedWordIndex !== null && selectedWordIndex < filteredWords.length - 1) {
      setSelectedWordIndex(selectedWordIndex + 1);
    }
  };

  const prevDetailWord = () => {
    if (selectedWordIndex !== null && selectedWordIndex > 0) {
      setSelectedWordIndex(selectedWordIndex - 1);
    }
  };

  const toggleDrawer = (open?: boolean) => {
    setIsDrawerOpen(prev => (typeof open === 'boolean' ? open : !prev));
  };

  const toggleAddModal = (open?: boolean) => {
    setIsAddModalOpen(prev => (typeof open === 'boolean' ? open : !prev));
  };

  const toggleOnlyBookmarked = () => {
    setOnlyBookmarked(prev => !prev);
  };

  const toggleFrameMode = () => {
    setIsFrameMode(prev => !prev);
  };

  return (
    <VocaContext.Provider
      value={{
        isLoading,
        allWords,
        filteredWords,
        totalCount: allWords.length,
        count248: words248.length,
        count900: words900.length,
        selectedGroup,
        sortMode,
        viewMode,
        searchQuery,
        onlyBookmarked,
        selectedWordIndex,
        selectedWord,
        isDrawerOpen,
        isAddModalOpen,
        isFrameMode,
        setSelectedGroup,
        setSortMode,
        setViewMode,
        setSearchQuery,
        toggleOnlyBookmarked,
        toggleBookmark,
        addCustomWord,
        openDetail,
        closeDetail,
        nextDetailWord,
        prevDetailWord,
        toggleDrawer,
        toggleAddModal,
        toggleFrameMode,
      }}
    >
      {children}
    </VocaContext.Provider>
  );
}

export function useVoca() {
  const context = useContext(VocaContext);
  if (!context) {
    throw new Error('useVoca must be used within a VocaProvider');
  }
  return context;
}
