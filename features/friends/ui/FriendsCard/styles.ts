import { grayscale } from "@/shared/config/theme/Colors";
import { StyleSheet } from "react-native";
import type { DefaultTheme } from "styled-components/native";

export const createFriendsCardStyles = (theme: DefaultTheme) => {
	const avatarSize = parseFloat(theme.rem(36));
	const borderOffset = avatarSize / 2;

	return StyleSheet.create({
		container: {
			paddingVertical: 16,
			flexDirection: "column",
			alignItems: "flex-end",
			alignSelf: "stretch",
		},
		header: {
			flexDirection: "row",
			paddingBottom: 6,
			justifyContent: "space-between",
			alignItems: "center",
			alignSelf: "stretch",
			marginBottom: 6,
		},
		userInfo: {
			flexDirection: "row",
			alignItems: "center",
			columnGap: 10,
		},
		name: {
			color: grayscale.gray200,
			fontFamily: "Pretendard-SemiBold",
			fontSize: 14,
			lineHeight: 16,
			letterSpacing: -0.28,
		},
		date: {
			color: grayscale.gray500,
			fontFamily: "Pretendard-SemiBold",
			fontSize: 14,
			lineHeight: 16,
			letterSpacing: -0.28,
		},
		emotionBadge: {
			paddingVertical: 8,
			paddingHorizontal: 12,
			justifyContent: "center",
			alignItems: "center",
			borderRadius: 60,
			backgroundColor: grayscale.gray700,
		},
		emotionBadgeText: {
			color: "#FFFFFF",
			textAlign: "center",
			fontFamily: "Pretendard-SemiBold",
			fontSize: 12,
			lineHeight: 16,
			letterSpacing: -0.24,
		},
		body: {
			paddingTop: 10,
			paddingBottom: 10,
			paddingLeft: 28,
			paddingRight: 0,
			marginLeft: borderOffset,
			justifyContent: "center",
			alignItems: "center",
			alignSelf: "stretch",
			borderLeftWidth: 2,
			borderLeftColor: grayscale.gray600,
		},
		bodyText: {
			width: 297,
			color: grayscale.gray50,
			fontFamily: "Pretendard-Regular",
			fontSize: 16,
			lineHeight: 24,
			letterSpacing: -0.32,
		},
	});
};
