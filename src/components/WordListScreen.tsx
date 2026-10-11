'use client';

import React from 'react';
import { Search, X, Bookmark, BookmarkCheck } from 'lucide-react';
import { useVoca } from '../context/VocaContext';

export default function WordListScreen() {
  const {
    filteredWords,
    searchQuery,
    setSearchQuery,
    sortMode,
    setSortMode,
    onlyBookmarked,
    toggleOnlyBookmarked,
    toggleBookmark,
    openDetail,
  } = useVoca();

  return (
    <div className="flex flex-col h-full bg-white select-none">
      {/* 1. Search Bar & Bookmark Filter */}
      <div className="px-4 pt-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex-1 relative flex items-center">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="단어 또는 뜻 검색..."
              className="w-full pl-9 pr-8 py-2 bg-gray-50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-hidden focus:border-blue-500 focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                aria-label="검색어 지우기"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={toggleOnlyBookmarked}
            title={onlyBookmarked ? '모든 단어 보기' : '북마크한 단어만 보기'}
            className={`p-2 rounded-lg border transition-all ${
              onlyBookmarked
                ? 'bg-amber-50 border-amber-400 text-amber-500 shadow-xs'
                : 'bg-white border-gray-300 text-gray-400 hover:text-gray-600'
            }`}
          >
            {onlyBookmarked ? (
              <BookmarkCheck className="w-5 h-5 fill-amber-500 text-amber-600" />
            ) : (
              <Bookmark className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* 2. Sort Bar: ABC순 | 최신순 */}
      <div className="px-4 py-2 flex items-center justify-between text-base">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setSortMode('abc')}
            className={`text-lg transition-colors cursor-pointer ${
              sortMode === 'abc'
                ? 'font-black text-black underline decoration-2 underline-offset-4'
                : 'font-normal text-gray-400 hover:text-gray-700'
            }`}
          >
            ABC순
          </button>
          <span className="text-gray-300 text-lg">|</span>
          <button
            onClick={() => setSortMode('latest')}
            className={`text-lg transition-colors cursor-pointer ${
              sortMode === 'latest'
                ? 'font-black text-black underline decoration-2 underline-offset-4'
                : 'font-normal text-gray-400 hover:text-gray-700'
            }`}
          >
            최신순
          </button>
        </div>

        <div className="text-xs font-semibold text-gray-500">
          총 <span className="text-gray-900 font-bold">{filteredWords.length}</span>개
        </div>
      </div>

      {/* 3. Table Column Headers (Wireframe 2) */}
      <div className="px-4 py-2 border-t border-gray-200 border-b-2 border-black flex items-center text-sm font-black text-gray-900 bg-gray-50/50">
        <div className="w-[34%]">영어 단어</div>
        <div className="w-[20%]">품사</div>
        <div className="w-[30%]">한글 뜻</div>
        <div className="w-[16%] text-right">추가일</div>
      </div>

      {/* 4. Word List Items */}
      <div className="flex-1 overflow-y-auto divide-y divide-gray-100">
        {filteredWords.length === 0 ? (
          <div className="py-20 text-center text-gray-400 text-sm">
            검색된 단어가 없습니다.
          </div>
        ) : (
          filteredWords.map((item, index) => {
            const primaryPos = item.details.length > 0 ? item.details[0].pos : '';
            const combinedMeaning = item.details.map((d) => d.meaning).join(', ');

            return (
              <div
                key={item.id}
                onClick={() => openDetail(index)}
                className="group px-4 py-3.5 flex items-center hover:bg-blue-50/40 active:bg-blue-100/50 cursor-pointer transition-colors"
              >
                {/* 영어 단어 */}
                <div className="w-[34%] flex items-center gap-1.5 pr-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleBookmark(item.id);
                    }}
                    className="p-0.5 text-gray-300 hover:text-amber-500 transition-colors"
                  >
                    <Bookmark
                      className={`w-3.5 h-3.5 ${
                        item.isBookmarked ? 'fill-amber-400 text-amber-500' : 'text-gray-300'
                      }`}
                    />
                  </button>
                  <span className="font-bold text-gray-900 text-[15px] truncate group-hover:text-blue-600 transition-colors">
                    {item.word}
                  </span>
                </div>

                {/* 품사 */}
                <div className="w-[20%] text-[13px] text-gray-600 truncate pr-1">
                  {primaryPos}
                </div>

                {/* 한글 뜻 */}
                <div className="w-[30%] text-[13px] text-gray-800 truncate pr-1">
                  {combinedMeaning}
                </div>

                {/* 추가일 */}
                <div className="w-[16%] text-[12px] text-gray-400 text-right whitespace-nowrap">
                  {item.dateAdded || '26.03.30'}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
