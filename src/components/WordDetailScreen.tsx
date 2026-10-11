'use client';

import React from 'react';
import { Bookmark, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import { useVoca } from '../context/VocaContext';

export default function WordDetailScreen() {
  const {
    selectedWord,
    selectedWordIndex,
    filteredWords,
    toggleBookmark,
    nextDetailWord,
    prevDetailWord,
  } = useVoca();

  if (!selectedWord || selectedWordIndex === null) return null;

  // Header pos | meaning list
  const headerParts: string[] = [];
  selectedWord.details.forEach(d => {
    if (d.pos) headerParts.push(d.pos);
  });
  selectedWord.details.forEach(d => {
    if (d.meaning) headerParts.push(d.meaning);
  });

  const naverLink1 = `https://en.dict.naver.com/#/search?query=${encodeURIComponent(selectedWord.word + ' example')}`;
  const naverLink2 = `https://en.dict.naver.com/#/search?query=${encodeURIComponent(selectedWord.word + ' sentence')}`;
  const naverLink3 = `https://en.dict.naver.com/#/search?query=${encodeURIComponent(selectedWord.word)}`;

  const googleImage1 = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(selectedWord.word)}`;
  const googleImage2 = `https://www.google.com/search?tbm=isch&q=${encodeURIComponent(selectedWord.word + ' visual')}`;

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* Scrollable Content Body */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-7">
        {/* 1. Main Word Title & Bookmark */}
        <div>
          <div className="flex items-baseline justify-between">
            <h1 className="text-4xl font-black text-gray-900 tracking-tight break-words">
              {selectedWord.word}
            </h1>
            <button
              onClick={() => toggleBookmark(selectedWord.id)}
              className="p-1 text-gray-400 hover:text-amber-500 transition-colors ml-3"
              aria-label="북마크 토글"
            >
              <Bookmark
                className={`w-7 h-7 ${
                  selectedWord.isBookmarked
                    ? 'fill-amber-400 text-amber-500'
                    : 'text-gray-300'
                }`}
              />
            </button>
          </div>

          {/* POS & Meaning Pipe Bar */}
          <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-lg font-bold text-gray-800">
            {headerParts.map((part, idx) => (
              <React.Fragment key={idx}>
                {idx > 0 && <span className="text-gray-400 font-normal">|</span>}
                <span>{part}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* 2. English Examples Section (WireFrame Screen 4) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between py-1 border-b border-gray-100">
            <div>
              <div className="text-sm font-bold text-gray-800">영어 예문1</div>
              <div className="text-xs text-gray-500">(예문 한글 뜻)</div>
            </div>
            <a
              href={naverLink1}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline py-1"
            >
              네이버 예문 #1
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-gray-100">
            <div>
              <div className="text-sm font-bold text-gray-800">영어 예문2</div>
              <div className="text-xs text-gray-500">(예문 한글 뜻)</div>
            </div>
            <a
              href={naverLink2}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline py-1"
            >
              네이버 예문 #2
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-gray-100">
            <div>
              <div className="text-sm font-bold text-gray-800">영어 예문3</div>
              <div className="text-xs text-gray-500">(예문 한글 뜻)</div>
            </div>
            <a
              href={naverLink3}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline py-1"
            >
              네이버 예문 #3
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* 3. Related Images Section (WireFrame Screen 4) */}
        <div className="space-y-4 pt-2">
          {/* Image Box 1 */}
          <div className="w-full h-32 rounded-lg bg-slate-200/90 border border-slate-300/80 flex flex-col items-center justify-center p-4 text-center shadow-xs">
            <span className="text-xl font-black text-gray-900 mb-2">관련 이미지#1</span>
            <a
              href={googleImage1}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline"
            >
              구글 검색 이미지 #1
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Image Box 2 */}
          <div className="w-full h-32 rounded-lg bg-slate-200/90 border border-slate-300/80 flex flex-col items-center justify-center p-4 text-center shadow-xs">
            <span className="text-xl font-black text-gray-900 mb-2">관련 이미지#2</span>
            <a
              href={googleImage2}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 hover:underline"
            >
              구글 검색 이미지 #2
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar: 이전 단어 | X / Y | 다음 단어 */}
      <div className="border-t border-gray-200 bg-white px-4 py-3 flex items-center justify-between">
        <button
          onClick={prevDetailWord}
          disabled={selectedWordIndex === 0}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all ${
            selectedWordIndex === 0
              ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
              : 'text-gray-800 bg-slate-100 hover:bg-slate-200 active:scale-95'
          }`}
        >
          <ArrowLeft className="w-4 h-4" />
          이전 단어
        </button>

        <span className="text-sm font-bold text-gray-700">
          {selectedWordIndex + 1} / {filteredWords.length}
        </span>

        <button
          onClick={nextDetailWord}
          disabled={selectedWordIndex >= filteredWords.length - 1}
          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-bold transition-all ${
            selectedWordIndex >= filteredWords.length - 1
              ? 'text-gray-300 bg-gray-50 cursor-not-allowed'
              : 'text-gray-800 bg-slate-100 hover:bg-slate-200 active:scale-95'
          }`}
        >
          다음 단어
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
