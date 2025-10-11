import { theme } from "@/shared/config/theme/theme";
import styled from "styled-components/native";

type Theme = typeof theme;

interface IconButtonProps {
	$size?: "large" | "medium";
	$pressed?: boolean;
	$iconColor?: string;
	$color?: "default" | "happy";
}

const getSize = (size?: string) => {
	switch (size) {
		case "medium":
			return 44;
		default:
			return 64;
	}
};

const getBackgroundColor = (
	theme: Theme,
	pressed?: boolean,
	color?: string,
) => {
	if (color === "happy") {
		return theme.colors.happy;
	}
	if (pressed) return theme.grayscale.gray700;
	return theme.grayscale.gray800;
};

export const Background = styled.View<IconButtonProps>`
	width: ${({ theme, $size }) => theme.rem(getSize($size))};
	height: ${({ theme, $size }) => theme.rem(getSize($size))};
	border-radius: ${({ theme }) => theme.rem(100)};
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: ${({ theme, $pressed, $color }) => getBackgroundColor(theme, $pressed, $color)};
	overflow: hidden;
`;

export const IconContainer = styled.View<IconButtonProps>`
	width: ${({ theme }) => theme.rem(24)};
	height: ${({ theme }) => theme.rem(24)};
	display: flex;
	align-items: center;
	justify-content: center;
`;
