import messaging from "@react-native-firebase/messaging";
import * as Device from "expo-device";
import { Alert, Platform } from "react-native";

/**
 * 🔔 푸시 알림 권한 요청 및 FCM 토큰 등록 함수
 * - 실제 기기에서만 작동 (시뮬레이터는 X)
 * - Firebase Cloud Messaging 사용
 */
export async function registerForPushNotificationsAsync(): Promise<
	string | null
> {
	try {
		// ✅ 1️⃣ 물리 디바이스 여부 확인
		if (!Device.isDevice) {
			Alert.alert("알림", "푸시 알림은 실제 기기에서만 작동합니다.");
			return null;
		}

		// ✅ 2️⃣ 알림 권한 요청
		const authStatus = await messaging().requestPermission();
		const enabled =
			authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
			authStatus === messaging.AuthorizationStatus.PROVISIONAL;

		if (!enabled) {
			Alert.alert("알림", "푸시 알림 권한이 허용되지 않았습니다.");
			return null;
		}

		// ✅ 3️⃣ FCM 토큰 발급
		const fcmToken = await messaging().getToken();
		console.log("🔥 [FCM Token]", fcmToken);

		// ✅ 4️⃣ iOS용 Foreground 알림 설정
		if (Platform.OS === "ios") {
			await messaging().registerDeviceForRemoteMessages();
			await messaging().setAutoInitEnabled(true);
		}

		// ✅ 5️⃣ FCM 토큰 반환
		return fcmToken;
	} catch (error) {
		console.error("❌ 푸시 토큰 등록 실패:", error);
		return null;
	}
}
