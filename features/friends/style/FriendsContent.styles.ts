import { grayscale } from "@/shared/config/theme/Colors";
import { StyleSheet } from "react-native";
import type { DefaultTheme } from "styled-components/native";

export const createFriendsContentStyles = (theme: DefaultTheme) => {
	const profileButtonSize = parseFloat(theme.rem(64));

	return {
		profileButtonSize,
		styles: StyleSheet.create({
			container: {
				width: "100%",
				paddingHorizontal: 16,
				paddingTop: 0,
				paddingBottom: 40,
			},
			profileRow: {
				flexDirection: "row",
				alignItems: "center",
				paddingVertical: 8,
				paddingHorizontal: 16,
				marginHorizontal: -16,
				marginBottom: 6,
			},
			profileButtonWrapper: {
				width: profileButtonSize,
				alignItems: "center",
			},
			profileLabel: {
				marginTop: 4,
				color: grayscale.gray50,
				textAlign: "center",
				fontFamily: "Pretendard-Medium",
				fontSize: 12,
				lineHeight: 16,
				letterSpacing: -0.24,
			},
			profileActionButton: {
				marginLeft: 14,
			},
			profileButtonContent: {
				width: profileButtonSize,
				height: profileButtonSize,
				alignItems: "center",
				justifyContent: "center",
			},
			spacing: {
				marginBottom: 6,
				alignSelf: "stretch",
				width: "100%",
			},
			dividerSpacing: {
				marginVertical: 8,
				alignSelf: "stretch",
				marginLeft: -16,
				marginRight: -16,
			},
			footer: {
				paddingTop: 8,
				paddingBottom: 24,
				alignItems: "center",
				width: "100%",
			},
			footerText: {
				color: grayscale.white,
				fontFamily: "Pretendard-Regular",
				fontSize: 14,
				lineHeight: 20,
				opacity: 0.6,
				textAlign: "center",
			},
			footerButtonWrapper: {
				marginTop: 16,
			},
		}),
	};
};
