'use client';

import React from 'react';
import { User, X, PlusCircle, Check } from 'lucide-react';
import { useVoca } from '../context/VocaContext';
import { GroupType } from '../types/voca';

export default function DrawerMenu() {
  const {
    isDrawerOpen,
    toggleDrawer,
    selectedGroup,
    setSelectedGroup,
    viewMode,
    setViewMode,
    totalCount,
    count248,
    count900,
    toggleAddModal,
    closeDetail,
  } = useVoca();

  if (!isDrawerOpen) return null;

  const handleGroupSelect = (grp: GroupType) => {
    setSelectedGroup(grp);
    setViewMode('wordList');
    closeDetail();
    toggleDrawer(false);
  };

  const handleModeSelect = (mode: 'wordList' | 'quiz', groupName?: GroupType) => {
    if (groupName) {
      setSelectedGroup(groupName);
    }
    setViewMode(mode);
    closeDetail();
    toggleDrawer(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex select-none">
      {/* Background Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => toggleDrawer(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-[310px] max-w-[85vw] bg-slate-200 h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-250">
        {/* Close Button top-right */}
        <button
          onClick={() => toggleDrawer(false)}
          className="absolute top-4 right-4 p-2 text-gray-500 hover:text-black rounded-full"
          aria-label="서랍 닫기"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 pt-10 pb-6 space-y-6">
          {/* SECTION 1: 단어 */}
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">단어</h2>
            <div className="mt-2 space-y-1 pl-1">
              <button
                onClick={() => handleModeSelect('wordList')}
                className={`block w-full text-left py-1 text-2xl transition-colors ${
                  viewMode === 'wordList' && selectedGroup !== '숙어'
                    ? 'font-black text-blue-600'
                    : 'font-semibold text-gray-800 hover:text-blue-500'
                }`}
              >
                단어장
              </button>
              <button
                onClick={() => handleModeSelect('quiz')}
                className={`block w-full text-left py-1 text-2xl transition-colors ${
                  viewMode === 'quiz' && selectedGroup !== '숙어'
                    ? 'font-black text-blue-600'
                    : 'font-semibold text-gray-800 hover:text-blue-500'
                }`}
              >
                단어테스트
              </button>
            </div>
          </div>

          {/* SECTION 2: 숙어 */}
          <div>
            <h2 className="text-3xl font-black text-gray-900 tracking-tight">숙어</h2>
            <div className="mt-2 space-y-1 pl-1">
              <button
                onClick={() => handleModeSelect('wordList', '숙어')}
                className={`block w-full text-left py-1 text-2xl transition-colors ${
                  viewMode === 'wordList' && selectedGroup === '숙어'
                    ? 'font-black text-blue-600'
                    : 'font-semibold text-gray-800 hover:text-blue-500'
                }`}
              >
                단어장
              </button>
              <button
                onClick={() => handleModeSelect('quiz', '숙어')}
                className={`block w-full text-left py-1 text-2xl transition-colors ${
                  viewMode === 'quiz' && selectedGroup === '숙어'
                    ? 'font-black text-blue-600'
                    : 'font-semibold text-gray-800 hover:text-blue-500'
                }`}
              >
                단어테스트
              </button>
            </div>
          </div>

          <div className="border-t border-gray-300 my-4" />

          {/* SECTION 3: 단어 그룹 선택 */}
          <div>
            <h3 className="text-xl font-black text-gray-900 tracking-tight mb-3">단어 그룹 선택</h3>
            <div className="space-y-2">
              {/* 전체 보기 */}
              <button
                onClick={() => handleGroupSelect('ALL')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  selectedGroup === 'ALL'
                    ? 'bg-white shadow-xs border border-gray-400 text-blue-900'
                    : 'bg-transparent text-gray-800 hover:bg-slate-300/60'
                }`}
              >
                <span className="flex items-center gap-2">
                  {selectedGroup === 'ALL' && <Check className="w-4 h-4 text-blue-600" />}
                  전체 보기
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  selectedGroup === 'ALL' ? 'bg-blue-100 text-blue-800' : 'bg-gray-300 text-gray-700'
                }`}>
                  {totalCount}개
                </span>
              </button>

              {/* 선별 영어단어 248개 */}
              <button
                onClick={() => handleGroupSelect('248')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  selectedGroup === '248'
                    ? 'bg-white shadow-xs border border-gray-400 text-blue-900'
                    : 'bg-transparent text-gray-800 hover:bg-slate-300/60'
                }`}
              >
                <span className="flex items-center gap-2">
                  {selectedGroup === '248' && <Check className="w-4 h-4 text-blue-600" />}
                  선별 영어단어 248개
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  selectedGroup === '248' ? 'bg-blue-100 text-blue-800' : 'bg-gray-300 text-gray-700'
                }`}>
                  {count248}개
                </span>
              </button>

              {/* 영어단어 900개 (387점용) */}
              <button
                onClick={() => handleGroupSelect('900')}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-bold transition-all ${
                  selectedGroup === '900'
                    ? 'bg-white shadow-xs border border-gray-400 text-blue-900'
                    : 'bg-transparent text-gray-800 hover:bg-slate-300/60'
                }`}
              >
                <span className="flex items-center gap-2">
                  {selectedGroup === '900' && <Check className="w-4 h-4 text-blue-600" />}
                  영어단어 900개 (387점용)
                </span>
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                  selectedGroup === '900' ? 'bg-blue-100 text-blue-800' : 'bg-gray-300 text-gray-700'
                }`}>
                  {count900}개
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Action Button: 목록 추가하기 */}
        <div className="p-5 border-t border-slate-300/60">
          <button
            onClick={() => {
              toggleDrawer(false);
              toggleAddModal(true);
            }}
            className="w-full py-3.5 bg-white border border-gray-400 rounded-lg text-gray-900 text-lg font-bold shadow-xs hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            <PlusCircle className="w-5 h-5 text-gray-700" />
            목록 추가하기
          </button>
        </div>

        {/* User Profile Section: Avatar + 홍길동 */}
        <div className="p-5 border-t border-slate-300/80 bg-slate-200 flex items-center gap-4">
          <div className="w-11 h-11 rounded-full bg-gray-900 flex items-center justify-center text-white shadow-xs">
            <User className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xl font-bold text-gray-900 leading-none">홍길동</div>
            <div className="text-xs text-gray-600 mt-1">TEPS VOCA 학습자</div>
          </div>
        </div>
      </div>
    </div>
  );
}
