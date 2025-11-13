import { grayscale } from "@/shared/config/theme/Colors";
import { StyleSheet } from "react-native";
import type { DefaultTheme } from "styled-components/native";

export const createFriendRequestCardStyles = (_theme: DefaultTheme) =>
	StyleSheet.create({
		container: {
			flexDirection: "column",
			alignItems: "center",
			gap: 16,
			alignSelf: "stretch",
			paddingHorizontal: 16,
			marginVertical: 24,
		},
		header: {
			flexDirection: "row",
			justifyContent: "space-between",
			alignItems: "center",
			alignSelf: "stretch",
		},
		title: {
			flexDirection: "row",
			alignItems: "center",
			flex: 1,
			justifyContent: "flex-start",
		},
		titleStrong: {
			color: grayscale.white,
			fontFamily: "Pretendard-Bold",
			fontSize: 16,
			lineHeight: 20,
			letterSpacing: -0.32,
		},
		titleText: {
			color: grayscale.white,
			fontFamily: "Pretendard-Medium",
			fontSize: 16,
			lineHeight: 20,
			letterSpacing: -0.32,
		},
		time: {
			color: grayscale.gray400,
			textAlign: "right",
			fontFamily: "Pretendard-Medium",
			fontSize: 12,
			lineHeight: 16,
			letterSpacing: -0.24,
		},
		user: {
			flexDirection: "row",
			alignItems: "center",
			gap: 10,
			alignSelf: "stretch",
		},
		userName: {
			color: grayscale.gray200,
			fontFamily: "Pretendard-SemiBold",
			fontSize: 14,
			lineHeight: 16,
			letterSpacing: -0.28,
		},
		actionsWrapper: {
			alignSelf: "stretch",
		},
		actions: {
			flexDirection: "row",
			alignItems: "center",
			justifyContent: "space-between",
			gap: 8,
			alignSelf: "stretch",
		},
	});
