import styled from "styled-components/native";
import { Animated } from "react-native";

export const Container = styled.View`
  position: absolute;
  left: 0;
  right: 0;
  bottom: ${({ theme }) => theme.rem(80)};
  align-items: center;
`;

export const ToastWrapper = styled(Animated.View)`
  max-width: 80%;
  padding: ${({ theme }) => theme.rem(12)} ${({ theme }) => theme.rem(16)};
  border-radius: ${({ theme }) => theme.rem(24)};
  background-color: rgba(16, 16, 16, 0.9);
`;

export const ToastText = styled(Animated.Text)`
  color: #ffffff;
  font-size: ${({ theme }) => theme.rem(14)};
  text-align: center;
`;
