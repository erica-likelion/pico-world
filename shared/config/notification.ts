import { sendFcmToken } from "@/shared/api/notification";
import Constants from "expo-constants";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

// 앱이 포그라운드 상태일 때 알림을 어떻게 처리할지 설정합니다.
Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: true,
		shouldSetBadge: false,
		shouldShowBanner: true,
		shouldShowList: true,
	}),
});

export async function registerForPushNotificationsAsync() {
	const { status: existingStatus } = await Notifications.getPermissionsAsync();
	let finalStatus = existingStatus;

	if (existingStatus !== "granted") {
		const { status } = await Notifications.requestPermissionsAsync();
		finalStatus = status;
	}

	if (finalStatus !== "granted") {
		alert("푸시 알림 권한이 필요합니다.");
		return;
	}

	// 모든 경우를 대비한 안전한 projectId 추출
	const projectId =
		Constants?.expoConfig?.extra?.projectId ??
		Constants?.manifest2?.extra?.projectId ??
		"c7e63ad1-4f17-41fc-bb1e-44d4c64d9bfb";

	if (!projectId) {
		throw new Error(
			"❌ No projectId found. Please set it in app.json or manually.",
		);
	}

	const fcmToken = await Notifications.getDevicePushTokenAsync();
	console.log("FCM Push Token:", fcmToken.data);

	if (fcmToken.data) {
		await sendFcmToken(fcmToken.data);
	}

	if (Platform.OS === "android") {
		Notifications.setNotificationChannelAsync("default", {
			name: "default",
			importance: Notifications.AndroidImportance.MAX,
			vibrationPattern: [0, 250, 250, 250],
			lightColor: "#FFF231F7C",
		});
	}

	return fcmToken.data;
}
