# Omegamon (하룰라라)

> 하룰라라 팀의 장기 프로젝트입니다.

![Omegamon Logo](https://i.namu.wiki/i/QvhuRsZj-BS9S1XuZOKJeXn_01_OMbh62kYHk2QhOa2zDmS2xrl2Weuk4l0v9xwI576fv2-YG42NQ42wkuI2kw.webp)

## 🛠️ Tech Stack & Architecture

- **Framework**: React Native (Expo)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (with NativeWind)
- **Architecture**: Feaㅔture-Sliced Design (FSD)

### Feature-Sliced Design (FSD)

이 프로젝트는 확장성과 유지보수성을 높이기 위해 FSD(Feature-Sliced Design) 방법론을 따릅니다. 주요 레이어의 역할은 다음과 같습니다.

- **`src/app`**: 앱 초기화, 라우팅 설정, 전역 스타일, Provider 등 최상위 로직을 담당합니다.
- **`src/pages`**: 앱의 개별 화면(페이지)입니다. 여러 위젯과 기능(feature)으로 구성됩니다.
- **`src/widgets`**: 여러 기능(feature)이나 엔티티(entity)를 조합한 UI 블록입니다. (예: 헤더, 피드 목록)
- **`src/features`**: 사용자가 특정 작업을 수행하기 위한 기능 단위입니다. (예: 로그인, 글쓰기)
- **`src/entities`**: 비즈니스 핵심 도메인과 관련된 코드입니다. (예: User, Post 모델 및 UI 카드)
- **`src/shared`**: 특정 비즈니스 로직에 묶이지 않는 재사용 가능한 코드입니다. (예: UI 컴포넌트, 유틸리티 함수, 설정 등)

## 🚀 Getting Started

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Run the Application

시뮬레이터/에뮬레이터에서 앱을 실행하려면:

```bash
# For Android
pnpm run android

# For iOS
pnpm run ios

# For Web
pnpm run web
```

Expo Go 앱에서 QR 코드를 스캔하여 실제 기기에서 앱을 실행하려면:

```bash
pnpm run start
```

### 3. Code Quality (Biome Lint & Format)

이 프로젝트는 [Biome](https://biomejs.dev/)을 사용해 **Lint & Format**을 관리합니다.  
Biome은 ESLint + Prettier를 대체하며, 빠르고 일관된 코드 스타일을 제공합니다.

#### 주요 명령어

- 코드 검사 (Lint):

```bash
pnpm lint
```

- 코드 포맷팅:

```bash
pnpm format
```
