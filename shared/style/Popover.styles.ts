import styled from "styled-components/native";

interface PopoverContainerProps {
	top?: number;
	right?: number;
	left?: number;
	bottom?: number;
	zIndex?: number;
}

export const PopoverContainer = styled.View<PopoverContainerProps>`
  position: absolute;
  ${({ top }) => (top !== undefined ? `top: ${top}px;` : "")}
  ${({ right }) => (right !== undefined ? `right: ${right}px;` : "")}
  ${({ bottom }) => (bottom !== undefined ? `bottom: ${bottom}px;` : "")}
  ${({ left }) => (left !== undefined ? `left: ${left}px;` : "")}
  width: ${({ theme }) => theme.rem(120)};
  background-color: ${({ theme }) => theme.grayscale.gray900};
  border-radius: ${({ theme }) => theme.rem(8)};
  z-index: ${({ zIndex }) => zIndex || 10};
`;

export const PopoverItem = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.rem(12)} ${({ theme }) => theme.rem(12)};
`;

export const PopoverItemText = styled.Text`
  color: ${({ theme }) => theme.grayscale.white};
  ${({ theme }) => theme.typography.b2};
`;
