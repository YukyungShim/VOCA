import type { Metadata, Viewport } from 'next';
import './globals.css';
import { VocaProvider } from '../context/VocaContext';

export const metadata: Metadata = {
  title: 'TEPS VOCA - 영어 단어장 (Next.js v2)',
  description: 'TEPS 필수 어휘 단어장 모바일 웹 애플리케이션',
  icons: {
    icon: '/logo/logo_only.png',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="antialiased selection:bg-blue-100 selection:text-blue-900">
        <VocaProvider>
          {children}
        </VocaProvider>
      </body>
    </html>
  );
}
