import { DefaultTheme } from "@react-navigation/native";
import { colors, grayscale } from "./Colors";
import { rem } from "./metrics";
import { typography } from "./typography";

export const theme = {
	colors,
	grayscale,
	typography,
	rem,
};

export const navigationTheme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		background: colors.background,
		card: colors.background,
		text: colors.text,
	},
};
