'use client';

import React, { useEffect, useState } from 'react';

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(onFinish, 400);
    }, 1500);

    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div
      onClick={() => {
        setFading(true);
        setTimeout(onFinish, 300);
      }}
      className={`fixed inset-0 z-50 bg-white flex flex-col items-center justify-center p-6 cursor-pointer transition-opacity duration-400 select-none ${
        fading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="w-40 h-40 bg-slate-100 rounded-3xl p-6 shadow-xl flex items-center justify-center mb-6 animate-in zoom-in-95 duration-500">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo/logo_only.png"
          alt="TEPS VOCA 로고"
          className="max-w-full max-h-full object-contain"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
            const parent = e.currentTarget.parentElement;
            if (parent) {
              parent.innerHTML = '<span class="text-3xl font-black text-gray-900">TEPS</span>';
            }
          }}
        />
      </div>

      <h1 className="text-3xl font-black text-slate-800 tracking-wider mb-2">
        TEPS VOCA
      </h1>
      <p className="text-sm font-semibold text-gray-500 tracking-wide">
        TEPS 필수 어휘 학습 서비스
      </p>

      <div className="mt-8">
        <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
}
