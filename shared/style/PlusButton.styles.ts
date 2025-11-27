import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { Animated } from "react-native";
import styled from "styled-components/native";

export const OuterWrapper = styled(Animated.View).attrs(({ style }) => ({
	style,
}))`
  width: ${({ theme }) => theme.rem(100)};
  height: ${({ theme }) => theme.rem(100)};
  border-radius: 60px;
  z-index: 50;
`;

export const OuterBlur = styled(BlurView)`
  padding: ${({ theme }) => theme.rem(16)};
  border-radius: 80px;
  overflow: hidden;
  align-items: center;
`;

export const OuterGradient = styled(LinearGradient).attrs(() => ({
	colors: ["rgba(0, 0, 0, 0.30)", "rgba(0, 0, 0, 0.11)"],
	start: { x: 0, y: 1.0 },
	end: { x: 0.2, y: 0.2 },
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 52px;
`;

export const InnerWrapper = styled(BlurView)`
  border-radius: 60px;
  border: 1px solid #ffffff40;
  overflow: hidden;
  width: ${({ theme }) => theme.rem(68)};
  height: ${({ theme }) => theme.rem(68)};
`;

export const InnerGradient = styled(LinearGradient).attrs(() => ({
	colors: ["rgba(0, 0, 0, 0.17)", "rgba(0, 0, 0, 0.33)"],
	start: { x: 0.2, y: 0 },
	end: { x: 0.8, y: 0.8 },
}))`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const InnerContentWrapper = styled.View`
  padding: ${({ theme }) => theme.rem(10)};
  align-items: center;
  justify-content: center;
`;
