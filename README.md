# 📚 TEPS VOCA v2 (Next.js 마이그레이션 프로젝트)

기존 플러터(Flutter) 기반의 **TEPS 모바일 영어 단어장 앱**을 최신 **Next.js 16 (App Router) + TypeScript + Tailwind CSS** 스택으로 완벽하게 마이그레이션한 프로젝트입니다.

---

## 🚀 빠른 시작 (Quick Start)

### 1. 개발 서버 실행 (Port 3000)
```bash
npm run dev
# 또는
npm run dev -- -p 3000
```
브라우저 접속: [http://localhost:3000](http://localhost:3000)

### 2. 프로덕션 빌드 및 실행
```bash
npm run build
npm run start
```

---

## 📱 주요 구현 기능 (Features)

1. **iPhone 16 Pro 와이어프레임 & 반응형 듀얼 모드**
   - 상단 헤더 우측 토글 또는 플로팅 바로 **iPhone 16 Pro 목업 프레임 (393 × 852, Dynamic Island)**과 **전체화면 반응형 모드** 자유롭게 전환 가능.
   - iOS 하단 홈 인디케이터 및 물리 버튼 외형 완벽 재현.

2. **스플래시 인트로 (Splash Screen)**
   - 공식 로고 및 타이틀 연출, 부드러운 페이드인 후 메인 화면 진입.

3. **단어 목록 화면 (Word List)**
   - **실시간 검색**: 영어 단어 및 한글 뜻 동시 검색.
   - **정렬**: `ABC순` | `최신순` 정렬 지원.
   - **필터링**: 북마크 필터링 버튼 제공.
   - **테이블 헤더 & 리스트**: `영어 단어 | 품사 | 한글 뜻 | 추가일` 컬럼 구성.
   - 원클릭 북마크 토글 및 단어 클릭 시 상세 화면 이동.

4. **단어 상세 화면 (Word Detail)**
   - 대형 표제어 텍스트 및 품사/한글 뜻 구분 표시 (`|`).
   - **외부 연동**:
     - 네이버 영어사전 예문 검색 링크 (#1, #2, #3).
     - 구글 이미지 검색 링크 (#1, #2).
   - 하단 [이전 단어] / [다음 단어] 페이지 네비게이션.

5. **단어 테스트 / 퀴즈 모드 (Flashcards)**
   - 햄버거 서랍 메뉴에서 언제든지 접근 가능.
   - 카드 터치 시 정답(품사, 한글 뜻) 반전 노출.
   - [이전] / [다음 단어] 자율 학습 모드.

6. **좌측 햄버거 서랍 메뉴 (Drawer Menu)**
   - **단어**: 단어장 / 단어테스트
   - **숙어**: 단어장 / 단어테스트
   - **단어 그룹 선택**:
     - 전체 보기 (1,176개)
     - 선별 영어단어 248개 (248개)
     - 영어단어 900개 (387점용) (900개)
   - **목록 추가하기**: 사용자 정의 단어 등록 팝업.
   - **사용자 프로필**: 홍길동 프로필 헤더.

7. **데이터 영속성 (LocalStorage Persistence)**
   - 북마크 상태 및 사용자 추가 단어가 브라우저 로컬 스토리지에 영구 보존됩니다.

---

## 📁 디렉터리 구조

```text
TEPS_Voca_v2/
├── public/
│   ├── data/
│   │   └── teps_voca_data.json       # 원본 1,176개 어휘 데이터
│   └── logo/
│       ├── logo_only.png             # 공식 로고 (단독)
│       ├── logo_horizontal.png       # 가로형 로고
│       └── logo_vertical.png         # 세로형 로고
├── src/
│   ├── app/
│   │   ├── globals.css               # Tailwind CSS 및 기본 스타일
│   │   ├── layout.tsx                # 루트 레이아웃 & 메타데이터
│   │   └── page.tsx                  # 메인 페이지 및 화면 라우팅
│   ├── components/
│   │   ├── AppHeader.tsx             # 상단 헤더 (로고, 햄버거, 모드 토글)
│   │   ├── DrawerMenu.tsx            # 좌측 슬라이드 서랍 메뉴
│   │   ├── WordListScreen.tsx        # 단어 목록 화면 (검색/정렬/테이블)
│   │   ├── WordDetailScreen.tsx      # 단어 상세 화면 (사전/이미지 링크)
│   │   ├── QuizScreen.tsx            # 단어 테스트 플래시카드 화면
│   │   ├── AddWordModal.tsx          # 단어 추가 모달
│   │   ├── SplashScreen.tsx          # 스플래시 인트로 화면
│   │   └── PhoneFrame.tsx            # iPhone 16 Pro 목업 프레임
│   ├── context/
│   │   └── VocaContext.tsx           # 상태 관리 Context & Provider
│   ├── data/
│   │   └── teps_voca_data.json       # 정적 데이터 원본
│   └── types/
│       └── voca.ts                   # TypeScript 타입 정의
├── package.json
├── tsconfig.json
├── postcss.config.mjs
└── next.config.mjs
```
