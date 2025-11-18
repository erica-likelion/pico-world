import { Animated } from "react-native";
import styled from "styled-components/native";

export const Container = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${({ theme }) => theme.rem(80)};
  align-items: center;
`;

export const ToastWrapper = styled(Animated.View)`
  width: 90%;
  padding: ${({ theme }) => theme.rem(20)};
  border-radius: ${({ theme }) => theme.rem(24)};
  background-color: ${({ theme }) => theme.grayscale.gray800};
`;

export const ToastText = styled(Animated.Text)`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography["title3-medium"]};
  text-align: start;
`;
