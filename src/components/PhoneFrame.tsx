'use client';

import React, { ReactNode } from 'react';
import { useVoca } from '../context/VocaContext';
import { Smartphone, Monitor } from 'lucide-react';

export default function PhoneFrame({ children }: { children: ReactNode }) {
  const { isFrameMode, toggleFrameMode } = useVoca();

  if (!isFrameMode) {
    return (
      <div className="w-full min-h-screen bg-white max-w-lg mx-auto shadow-2xl relative flex flex-col overflow-hidden">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090d16] flex flex-col items-center justify-center p-4 sm:p-8 relative select-none">
      {/* Top Floating Control Bar */}
      <div className="mb-4 flex items-center gap-3 px-4 py-1.5 bg-slate-800/80 border border-slate-700/80 rounded-full shadow-lg backdrop-blur-md">
        <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
          <Smartphone className="w-3.5 h-3.5 text-blue-400" />
          iPhone 16 Pro 프레임 (393 × 852)
        </span>
        <button
          onClick={toggleFrameMode}
          className="text-xs font-bold text-blue-400 hover:text-blue-300 underline underline-offset-2 flex items-center gap-1 ml-2"
        >
          <Monitor className="w-3.5 h-3.5" />
          전체화면 모드
        </button>
      </div>

      {/* iPhone 16 Pro Outer Frame */}
      <div className="relative w-[393px] h-[852px] bg-[#111827] rounded-[54px] p-[12px] shadow-[0_0_0_4px_#334155,0_25px_60px_-15px_rgba(0,0,0,0.8),inset_0_0_0_2px_rgba(255,255,255,0.1)] flex flex-col shrink-0">
        {/* Hardware side button simulations */}
        <div className="absolute -left-[6px] top-[140px] w-[4px] h-[55px] bg-[#475569] rounded-l shadow-[0_75px_0_#475569,0_135px_0_#475569]" />
        <div className="absolute -right-[6px] top-[190px] w-[4px] h-[85px] bg-[#475569] rounded-r" />

        {/* Inner Screen Container */}
        <div className="w-full h-full bg-white rounded-[44px] relative overflow-hidden flex flex-col">
          {/* Dynamic Island Notch */}
          <div className="absolute top-[10px] left-1/2 -translate-x-1/2 w-[122px] h-[32px] bg-black rounded-[20px] z-40 flex items-center justify-between px-3 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-[#1e1e1e]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#111827] ring-1 ring-blue-900/30" />
          </div>

          {/* Screen Content */}
          <div className="w-full h-full pt-[38px] pb-[20px] flex flex-col relative overflow-hidden">
            {children}
          </div>

          {/* Bottom iOS Home Indicator */}
          <div className="absolute bottom-[6px] left-1/2 -translate-x-1/2 w-[134px] h-[4px] bg-black/80 rounded-full z-40 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}
