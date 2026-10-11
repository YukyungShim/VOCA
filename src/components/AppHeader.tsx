'use client';

import React from 'react';
import Image from 'next/image';
import { Menu, ArrowLeft, Smartphone, Monitor } from 'lucide-react';
import { useVoca } from '../context/VocaContext';

interface AppHeaderProps {
  showBackButton?: boolean;
}

export default function AppHeader({ showBackButton = false }: AppHeaderProps) {
  const { toggleDrawer, closeDetail, isFrameMode, toggleFrameMode } = useVoca();

  return (
    <header className="h-[60px] bg-white border-b border-gray-100 flex items-center justify-between px-4 sticky top-0 z-20 select-none">
      <div className="w-10 flex items-center justify-start">
        {showBackButton ? (
          <button
            onClick={closeDetail}
            className="p-2 -ml-2 text-gray-800 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            aria-label="뒤로가기"
          >
            <ArrowLeft className="w-6 h-6 stroke-[2.2]" />
          </button>
        ) : (
          <button
            onClick={() => toggleDrawer(true)}
            className="p-2 -ml-2 text-gray-800 hover:text-black hover:bg-gray-100 rounded-full transition-colors"
            aria-label="메뉴 열기"
          >
            <Menu className="w-7 h-7 stroke-[2.2]" />
          </button>
        )}
      </div>

      {/* Center Logo Box with bordered rectangle */}
      <div className="flex items-center justify-center">
        <div className="h-10 px-4 py-1 border-[1.5px] border-gray-900 rounded flex items-center justify-center bg-white shadow-xs">
          <div className="relative w-20 h-6 flex items-center justify-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo/logo_only.png"
              alt="TEPS VOCA 로고"
              className="max-h-6 max-w-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                const parent = e.currentTarget.parentElement;
                if (parent) {
                  parent.innerHTML = '<span class="font-black text-gray-900 text-sm tracking-wider">TEPS</span>';
                }
              }}
            />
          </div>
        </div>
      </div>

      {/* Right Tool: Frame Toggle Button */}
      <div className="w-10 flex items-center justify-end">
        <button
          onClick={toggleFrameMode}
          title={isFrameMode ? '전체화면 모드로 전환' : 'iPhone 16 Pro 프레임 모드로 전환'}
          className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="화면 모드 전환"
        >
          {isFrameMode ? <Monitor className="w-5 h-5" /> : <Smartphone className="w-5 h-5 text-blue-600" />}
        </button>
      </div>
    </header>
  );
}
