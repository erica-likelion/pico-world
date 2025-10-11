# Theme Guide

이 문서는 프로젝트의 `styled-components` 테마 사용법을 안내합니다.

## 1. 전역 테마 적용

앱의 최상위 레이아웃 (`app/_layout.tsx`)에 `ThemeProvider`가 설정되어 있어, 모든 컴포넌트에서 테마에 접근할 수 있습니다.

```tsx
// app/_layout.tsx
import { ThemeProvider as StyledThemeProvider } from "styled-components/native";
import { theme } from "@/shared/config/theme/theme";

function RootLayoutNav() {
  return (
    <StyledThemeProvider theme={theme}>{/* ... a ... */}</StyledThemeProvider>
  );
}
```

## 2. 반응형 크기 조절 (`rem`)

`rem` 함수를 사용해 반응형으로 크기를 조절할 수 있습니다. 이 함수는 기기 너비에 따라 동적으로 값을 계산합니다.

- **네이티브 (iOS/Android)**: 기기 너비에 따라 스케일링된 숫자 값을 반환합니다.
- **웹**: 표준 `rem` 단위 문자열을 반환합니다.

**사용법:**

```tsx
import styled from "styled-components/native";

const Container = styled.View`
  padding: ${({ theme }) => theme.rem(20)}; /* 20px을 기준으로 반응형 값 적용 */
`;

const Title = styled.Text`
  font-size: ${({ theme }) =>
    theme.rem(24)}; /* 24px을 기준으로 반응형 값 적용 */
`;
```

## 3. 타이포그래피 (Typography)

`theme.typography` 객체를 통해 미리 정의된 타이포그래피 스타일을 사용할 수 있습니다. 모든 스타일은 `rem` 함수를 사용해 반응형으로 조절됩니다.

**사용법:**

```tsx
import styled from "styled-components/native";

const PageTitle = styled.Text`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.grayscale.black};
`;

const BodyText = styled.Text`
  ${({ theme }) => theme.typography.b1};
  color: ${({ theme }) => theme.grayscale.gray700};
`;
```

**팁**: `shared/ui/Typography.tsx`와 같이 재사용 가능한 타이포그래피 컴포넌트를 만들어 사용하면 편리합니다.

```tsx
// shared/ui/Typography.tsx
import styled from "styled-components/native";

export const H1 = styled.Text`
  ${({ theme }) => theme.typography.h1};
  color: ${({ theme }) => theme.grayscale.black};
`;

// ... 다른 타이포그래피 컴포넌트들
```

## 4. 색상 (Colors)

`theme.grayscale` 객체를 통해 색상 팔레트를 사용할 수 있습니다.

**사용법:**

```tsx
import styled from "styled-components/native";

const Card = styled.View`
  background-color: ${({ theme }) => theme.grayscale.white};
  border: 1px solid ${({ theme }) => theme.grayscale.gray100};
`;

const SubtleText = styled.Text`
  color: ${({ theme }) => theme.grayscale.gray500};
`;
```

**사용 가능한 색상:**

- `black`
- `gray900`
- `gray800`
- `gray700`
- `gray600`
- `gray500`
- `gray400`
- `gray300`
- `gray200`
- `gray100`
- `gray50`
- `white`
- `happy`
- `depressed`
- `comfort`
- `discomfort`
