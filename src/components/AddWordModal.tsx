'use client';

import React, { useState } from 'react';
import { PlusCircle, X } from 'lucide-react';
import { useVoca } from '../context/VocaContext';

export default function AddWordModal() {
  const { isAddModalOpen, toggleAddModal, addCustomWord } = useVoca();
  const [word, setWord] = useState('');
  const [pos, setPos] = useState('');
  const [meaning, setMeaning] = useState('');

  if (!isAddModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim() || !meaning.trim()) {
      alert('영어 단어와 한글 뜻을 입력해주세요.');
      return;
    }

    addCustomWord(word, pos, meaning);
    setWord('');
    setPos('');
    setMeaning('');
    toggleAddModal(false);
    alert(`단어 "${word.trim()}" 이(가) 추가되었습니다.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 select-none">
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs"
        onClick={() => toggleAddModal(false)}
      />

      <div className="relative w-full max-w-sm bg-white rounded-2xl shadow-2xl p-6 z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => toggleAddModal(false)}
          className="absolute top-4 right-4 p-1 text-gray-400 hover:text-black rounded-full"
          aria-label="모달 닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-4">
          <PlusCircle className="w-6 h-6 text-blue-600" />
          <h2 className="text-xl font-black text-gray-900">목록 추가하기</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              영어 단어 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={word}
              onChange={(e) => setWord(e.target.value)}
              placeholder="예: public"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-hidden focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              품사
            </label>
            <input
              type="text"
              value={pos}
              onChange={(e) => setPos(e.target.value)}
              placeholder="예: 형용사"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-hidden focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              한글 뜻 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              value={meaning}
              onChange={(e) => setMeaning(e.target.value)}
              placeholder="예: 대중의"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-hidden focus:border-blue-600"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => toggleAddModal(false)}
              className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-800 rounded-lg transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-xs transition-colors"
            >
              추가하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
