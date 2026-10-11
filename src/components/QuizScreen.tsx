'use client';

import React, { useState } from 'react';
import { ArrowLeft, BookOpen, RotateCcw } from 'lucide-react';
import { useVoca } from '../context/VocaContext';

export default function QuizScreen() {
  const { filteredWords, setViewMode } = useVoca();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  if (filteredWords.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center select-none">
        <p className="text-gray-500 mb-4">학습할 단어가 없습니다.</p>
        <button
          onClick={() => setViewMode('wordList')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm"
        >
          단어장으로 돌아가기
        </button>
      </div>
    );
  }

  const word = filteredWords[currentIndex % filteredWords.length];
  const primaryPos = word.details.length > 0 ? word.details[0].pos : '';
  const combinedMeaning = word.details.map((d) => d.meaning).join(', ');

  const handleNext = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev + 1) % filteredWords.length);
  };

  const handlePrev = () => {
    setShowAnswer(false);
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : filteredWords.length - 1));
  };

  return (
    <div className="flex flex-col h-full bg-white px-6 py-6 select-none">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between pb-4">
        <h2 className="text-base font-black text-gray-900">
          단어 테스트 ({currentIndex + 1} / {filteredWords.length})
        </h2>
        <button
          onClick={() => setViewMode('wordList')}
          className="flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-800"
        >
          <BookOpen className="w-4 h-4" />
          단어장으로
        </button>
      </div>

      {/* Main Flashcard */}
      <div className="flex-1 flex items-center justify-center py-4">
        <div
          onClick={() => setShowAnswer(!showAnswer)}
          className="w-full h-full max-h-[380px] bg-slate-50 border-2 border-slate-200 hover:border-blue-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md transition-all active:scale-[0.99]"
        >
          <div className="text-4xl sm:text-5xl font-black text-gray-900 text-center tracking-tight break-words mb-6">
            {word.word}
          </div>

          {showAnswer ? (
            <div className="space-y-2 text-center animate-in fade-in duration-200">
              {primaryPos && (
                <div className="text-base font-bold text-gray-600">
                  {primaryPos}
                </div>
              )}
              <div className="text-2xl font-black text-blue-600 leading-snug">
                {combinedMeaning}
              </div>
            </div>
          ) : (
            <div className="px-4 py-2 bg-slate-200/80 rounded-full text-xs font-bold text-gray-600 flex items-center gap-1.5 shadow-xs">
              <RotateCcw className="w-3.5 h-3.5" />
              터치하여 정답 확인
            </div>
          )}
        </div>
      </div>

      {/* Control Buttons */}
      <div className="flex items-center gap-3 pt-4">
        <button
          onClick={handlePrev}
          className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-gray-800 font-bold rounded-xl transition-all active:scale-98"
        >
          이전
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-xs active:scale-98"
        >
          다음 단어
        </button>
      </div>
    </div>
  );
}
