import { Animated } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  flex-direction: row;
  align-items: flex-start;
  gap: ${({ theme }) => theme.rem(8)};
  width: 100%;
  padding: ${({ theme }) => theme.rem(6)} 0;
`;

export const CharacterWrapper = styled.View`
  width: 36px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 999px;
  background-color: ${({ theme }) => theme.grayscale.gray900};
`;

export const Character = styled.Text`
  ${({ theme }) => theme.typography["title4-bold"]};
  color: ${({ theme }) => theme.grayscale.white};
`;

export const BubbleWrapper = styled.View`
  display: flex;
  padding: ${({ theme }) => theme.rem(10)} ${({ theme }) => theme.rem(16)};
  align-items: flex-start;
  flex: 1 0 0;
  border-radius: 20px 20px 20px 4px;
  background-color: ${({ theme }) => theme.grayscale.gray800};
`;

export const Bubble = styled.Text`
  ${({ theme }) => theme.typography.b3};
  color: ${({ theme }) => theme.grayscale.white};
`;

export const Cursor = styled(Animated.Text)`
  ${({ theme }) => theme.typography.b3};
  color: ${({ theme }) => theme.grayscale.white};
`;
