import { sendFcmToken } from "@/shared/api/notification";
import {
	AuthorizationStatus,
	getMessaging,
	getToken,
	requestPermission,
} from "@react-native-firebase/messaging";

export async function registerForPushNotificationsAsync() {
	const messaging = getMessaging();
	const authStatus = await requestPermission(messaging);

	const enabled =
		authStatus === AuthorizationStatus.AUTHORIZED ||
		authStatus === AuthorizationStatus.PROVISIONAL;

	if (enabled) {
		console.log("푸시 알림 권한이 허용되었습니다.");
		const fcmToken = await getToken(messaging);
		console.log("FCM Push Token:", fcmToken);

		if (fcmToken) {
			await sendFcmToken(fcmToken);
		}
		return fcmToken;
	} else {
		console.log("푸시 알림 권한이 거부되었습니다.");
		return;
	}
}
