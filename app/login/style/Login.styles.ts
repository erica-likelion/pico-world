import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

export const LoginContainer = styled.View`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  padding-top: 101px;
  padding-left: 16px;
  padding-right: 16px;
`;

export const Title = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography.h3};
  z-index: 10;
`;

export const BackgroundGradient = styled(LinearGradient).attrs({
	colors: [
		"rgba(255, 104, 91, 0.15)",
		"rgba(0, 0, 0, 0.85)",
		"rgba(82, 82, 82, 0.85)",
	],
	locations: [0, 0.5, 1],
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const BackgroundBlur = styled(BlurView).attrs({
	intensity: 10,
	tint: "default",
})`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const EclipseWrap = styled.View`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const EclipseImage = styled.Image`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-225px, -242px);
  width: ${({ theme }) => theme.rem(450)};
`;
