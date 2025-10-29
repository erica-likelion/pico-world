import type { theme } from "@/shared/config/theme/theme";
import styled from "styled-components/native";

type Theme = typeof theme;

interface ButtonProps {
	$size?: "large" | "medium" | "small";
	$color?: "white" | "gray" | "black";
	$disabled?: boolean;
	$pressed?: boolean;
}

const getSize = (size?: string) => {
	switch (size) {
		case "medium":
			return { width: 151, height: 42 };
		case "small":
			return { width: 90, height: 42 };
		default:
			return { width: 343, height: 62 };
	}
};

const getBgColor = (
	theme: Theme,
	color?: string,
	disabled?: boolean,
	pressed?: boolean,
) => {
	if (color === "white") {
		if (disabled) return theme.grayscale.gray800;
		if (pressed) return theme.grayscale.gray100;
		return theme.grayscale.white;
	}

	if (color === "gray") {
		if (disabled) return theme.grayscale.gray800;
		if (pressed) return theme.grayscale.gray700;
		return theme.grayscale.gray800;
	}

	if (color === "black") {
		if (pressed) return theme.grayscale.gray200;
		return theme.grayscale.black;
	}

	if (disabled) return theme.grayscale.gray800;
	if (pressed) return theme.grayscale.gray100;
	return theme.grayscale.white;
};

const getTextColor = (theme: Theme, color?: string, disabled?: boolean) => {
	if (disabled) return theme.grayscale.gray600;

	if (color === "white") {
		return theme.grayscale.black;
	}

	if (color === "gray" || color === "black") {
		return theme.grayscale.white;
	}
	return theme.grayscale.black;
};

const getText = (theme: Theme, size?: string) => {
	switch (size) {
		case "medium":
			return theme.typography["title3-bold"];
		case "small":
			return theme.typography["title4-bold"];
		default:
			return theme.typography["title1-bold"];
	}
};

export const Background = styled.View<ButtonProps>`
  width: ${({ theme, $size }) => theme.rem(getSize($size).width)};
  height: ${({ theme, $size }) => theme.rem(getSize($size).height)};
  border-radius: 999px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme, $color, $disabled, $pressed }) =>
		getBgColor(theme, $color, $disabled, $pressed)};
  border-width: ${({ $color }) => ($color === "black" ? "1px" : "0px")};
  border-color: ${({ theme, $color, $disabled }) => {
		if ($color === "black") {
			return $disabled ? theme.grayscale.gray700 : theme.grayscale.gray400;
		}
		return "transparent";
	}};
`;

export const Text = styled.Text<ButtonProps>`
  ${({ theme, $size }) => getText(theme, $size)};
  color: ${({ theme, $color, $disabled }) =>
		getTextColor(theme, $color, $disabled)};
`;
