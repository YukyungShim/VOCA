# 📚 TEPS VOCA - 플러터 영어 단어장 앱

TEPS(Test of English Proficiency developed by Seoul National University) 시험 대비를 위한 **모바일 영어 단어장 플러터(Flutter) 애플리케이션** 프로젝트입니다.

---

## 📱 주요 기능 (Key Features)

1. **와이어프레임(WireFrame) 기반 모바일 UI**
   - iPhone 16 Pro 규격에 맞춘 깔끔하고 직관적인 모바일 레이아웃
   - **스플래시 화면**: 공식 로고 인트로 연출
   - **단어 목록 화면**: `ABC순` | `최신순` 정렬, 실시간 키워드/뜻 검색, 북마크 기능
   - **햄버거 메뉴 (좌측 서랍)**:
     - 📌 **전체 보기** (1,176개 단어)
     - 📌 **선별 영어단어 248개**
     - 📌 **영어단어 900개 (387점용)**
     - 💡 **목록 추가하기**: 사용자 정의 단어 등록
     - 👤 **프로필 헤더**
   - **단어 상세 화면**:
     - 대형 단어 텍스트 및 품사/뜻 파이프(`|`) 구분선 표시
     - **네이버 사전 예문링크 (1, 2, 3)** 바로가기
     - **구글 이미지 검색링크 (1, 2)** 바로가기
     - 이전 단어 / 다음 단어 탐색 기능
   - **단어 테스트 (퀴즈/플래시카드)**: 터치하여 정답 확인 및 자율 학습 모드

---

## 📁 프로젝트 구조

```text
TEPS VOCA/
├── Logo/                       # 로고 이미지 자산
│   ├── 로고만.png
│   ├── 로고_가로.png
│   └── 로고_세로.png
├── TEPS 선별 영어 단어 248개.xlsx # 원본 엑셀 단어장 1
├── TEPS 영어 단어 900개(387점용).xlsx # 원본 엑셀 단어장 2
├── WireFrame_v1.png            # 설계 와이어프레임 이미지
├── teps_voca_data.json         # 변환된 JSON 데이터
└── TEPS_Voca_v1/               # 플러터 프로젝트 메인
    ├── pubspec.yaml            # 패키지 및 에셋 설정
    ├── assets/                 # 로고 및 JSON 에셋
    ├── lib/                    # Flutter Dart 소스코드
    │   ├── main.dart           # 앱 엔트리포인트
    │   ├── models/             # 단어 데이터 모델
    │   ├── providers/          # 상태 관리 (Provider)
    │   ├── screens/            # 앱 화면 (스플래시, 목록, 상세, 퀴즈, 추가)
    │   └── widgets/            # 공통 위젯 (Header, Drawer)
    └── web/                    # 웹 프리뷰 실행기
```

---

## 🚀 실행 방법 (How to Run)

### 1. Flutter 앱 실행 (모바일/데스크톱)
```bash
cd TEPS_Voca_v1
flutter pub get
flutter run
```

### 2. 웹 브라우저 로컬 서버 실행
```bash
cd TEPS_Voca_v1
python -m http.server 8080
# 브라우저 접속: http://localhost:8080/web/index.html
```
