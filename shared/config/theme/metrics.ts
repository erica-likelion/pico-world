import { Dimensions, Platform } from "react-native";

const { width } = Dimensions.get("window");
const baseFontSize = (width / 375) * 16;

export const rem = (px: number) => {
	if (Platform.OS === "web") {
		return `${px / 16}rem`;
	}
	return `${(px / 16) * baseFontSize}px`;
};
