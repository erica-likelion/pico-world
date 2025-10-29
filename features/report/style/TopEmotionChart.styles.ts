import type { EmotionChip } from "@/shared/types";
import { LinearGradient } from "expo-linear-gradient";
import styled from "styled-components/native";

export const Container = styled.View`
  padding: ${({ theme }) => theme.rem(20)};
  background: rgba(32, 32, 32, 0.6);
  border-radius: 40px;
  backdrop-filter: blur(17.5px);
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: ${({ theme }) => theme.rem(16)};
  margin-horizontal: ${({ theme }) => theme.rem(16)};
`;

export const Label = styled.Text`
  ${({ theme }) => theme.typography["title2-medium"]};
  color: ${({ theme }) => theme.grayscale.gray50};
`;

export const EmotionWrapper = styled.View`
  width: 100%;
  flex-direction: column;
  gap: ${({ theme }) => theme.rem(16)};
`;

export const EmotionList = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const EmotionBox = styled(LinearGradient).attrs<EmotionChip>(
	(props) => ({
		colors: [props.mainColor, props.subColor],
		start: { x: 0, y: 0 },
		end: { x: 0, y: 1 },
	}),
)`
  width: ${({ theme }) => theme.rem(143.5)};
  height: ${({ theme }) => theme.rem(24)};
  border-radius: 16px;
` as React.ComponentType<EmotionChip>;

export const RightCol = styled.View`
  flex-direction: column;
  align-items: flex-end;
  position: relative;
`;

export const Count = styled.Text`
  ${({ theme }) => theme.typography["title4-semibold"]};
  color: ${({ theme }) => theme.grayscale.white};
  position: absolute;
  top: ${({ theme }) => theme.rem(4)};
  left: ${({ theme }) => theme.rem(12)};
  z-index: 1;
`;
