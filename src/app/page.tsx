'use client';

import React, { useState } from 'react';
import { useVoca } from '../context/VocaContext';
import AppHeader from '../components/AppHeader';
import DrawerMenu from '../components/DrawerMenu';
import WordListScreen from '../components/WordListScreen';
import WordDetailScreen from '../components/WordDetailScreen';
import QuizScreen from '../components/QuizScreen';
import AddWordModal from '../components/AddWordModal';
import SplashScreen from '../components/SplashScreen';
import PhoneFrame from '../components/PhoneFrame';

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true);
  const { selectedWordIndex, viewMode } = useVoca();

  const isDetailOpen = selectedWordIndex !== null;

  return (
    <>
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <PhoneFrame>
        {/* App Header */}
        <AppHeader showBackButton={isDetailOpen} />

        {/* Dynamic Screen View */}
        <main className="flex-1 overflow-hidden relative flex flex-col">
          {isDetailOpen ? (
            <WordDetailScreen />
          ) : viewMode === 'quiz' ? (
            <QuizScreen />
          ) : (
            <WordListScreen />
          )}
        </main>

        {/* Global Modals & Overlays */}
        <DrawerMenu />
        <AddWordModal />
      </PhoneFrame>
    </>
  );
}
