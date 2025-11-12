import { Animated } from "react-native";
import styled from "styled-components/native";

export const Container = styled(Animated.View)`
  position: absolute;
  left: 0;
  right: 0;
  padding: 0 ${({ theme }) => theme.rem(16)};
  align-items: center;
  z-index: 2000;
`;

export const Content = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.rem(10)};
  padding: ${({ theme }) => theme.rem(20)};
  border-radius: ${({ theme }) => theme.rem(20)};
  background-color: ${({ theme }) => theme.grayscale.gray800};
`;

export const Message = styled.Text`
  flex: 1;
  color: ${({ theme }) => theme.grayscale.white};
  font-family: "Pretendard";
  font-size: ${({ theme }) => theme.rem(14)};
  font-style: normal;
  font-weight: 500;
  line-height: ${({ theme }) => theme.rem(16)};
  letter-spacing: -0.28px;
`;
