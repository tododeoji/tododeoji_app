# 투두더지

TodoDeoji는 사용자 친화적인 인터페이스와 직관적인 기능을 제공하는 할 일 관리 애플리케이션입니다.

## 기술 스택

- React Native 0.76.5
- TypeScript
- React Navigation 7
- React Native Reanimated
- React Native Gesture Handler
- Zustand (상태 관리)
- Firebase (인증 및 데이터베이스)

## 프로젝트 구조

```
src/
├── assets/         # 아이콘, 이미지 등 정적 리소스
├── Common/         # 공통 스타일, 색상, 폰트 등
├── Components/     # 재사용 가능한 컴포넌트
├── data/          # 목업 데이터
├── lib/           # 유틸리티 함수
├── Navigation/    # 네비게이션 설정
├── Screens/       # 화면 컴포넌트
├── stores/        # Zustand 스토어
└── types/         # TypeScript 타입 정의
```

## 시작하기

### 필수 조건

- Node.js 16 이상
- React Native 개발 환경 설정
- iOS: Xcode 14 이상
- Android: Android Studio 및 JDK 11

### 설치

```bash
# 의존성 설치
yarn install

# iOS 의존성 설치
cd ios && pod install && cd ..

# 개발 서버 실행
yarn start

# iOS 실행
yarn ios

# Android 실행
yarn android
```

## 빌드

### Android

```bash
yarn build-android
```

### iOS

```bash
cd ios
xcodebuild -workspace TodoDeoji.xcworkspace -scheme TodoDeoji -configuration Release
```

## 주요 라이브러리

- `@gorhom/bottom-sheet`: 바텀 시트 UI
- `@react-navigation`: 네비게이션
- `react-native-draggable-flatlist`: 드래그 앤 드롭 리스트
- `react-native-reanimated`: 애니메이션
- `react-native-gesture-handler`: 제스처 처리
- `zustand`: 상태 관리
- `dayjs`: 날짜 처리
