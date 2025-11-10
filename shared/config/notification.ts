import Constants from "expo-constants";
import * as Notifications from "expo-notifications";

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

	const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync({
		projectId,
	});
	const fcmToken = await Notifications.getDevicePushTokenAsync();
	console.log("Expo Push Token:", expoPushToken);
	console.log("FCM Push Token:", fcmToken.data);

	return fcmToken.data;
}
