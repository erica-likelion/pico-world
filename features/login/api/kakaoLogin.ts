import { axiosInstance } from "@/shared/api/axios";
import { sendFcmToken } from "@/shared/api/notification";
import { registerForPushNotificationsAsync } from "@/shared/config/notification";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface KakaoLoginRequest {
	kakaoAccessToken: string;
	device?: string;
	pushToken?: string;
}

interface KakaoLoginResponse {
	accessToken: string;
	refreshToken: string;
	isOnboardingNeeded: boolean;
}

export const kakaoLogin = async (
	params: KakaoLoginRequest,
): Promise<boolean> => {
	console.log("kakaoLogin params:", params);
	const response = await axiosInstance.post<KakaoLoginResponse>(
		"/api/v1/auth/kakao/login",
		params,
		{
			headers: { Authorization: "" }, // 로그인 요청엔 기존 토큰 제거
		},
	);

	const { accessToken, refreshToken, isOnboardingNeeded } = response.data;

	await AsyncStorage.setItem("accessToken", accessToken);
	await AsyncStorage.setItem("refreshToken", refreshToken);
	console.log("accessToken", accessToken);
	console.log("refreshToken", refreshToken);
	const setupNotifications = async () => {
		const token = await registerForPushNotificationsAsync();
		if (token) {
			const res = await sendFcmToken(token);
			console.log("FCM token sent:", res);
		}
	};
	setupNotifications();

	const getKakaoProfile = async () => {
		try {
			const kakaoRes = await fetch("https://kapi.kakao.com/v2/user/me", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${params.kakaoAccessToken}`,
					"Content-Type": "application/json",
				},
			});

			const data = await kakaoRes.json();

			const rawUrl =
				data?.kakao_account?.profile?.profile_image_url ??
				data?.properties?.profile_image;

			const profileUrl = rawUrl?.replace(/^http:\/\//, "https://");

			console.log("카카오 프로필 URL:", profileUrl);

			if (!profileUrl) return;

			await axiosInstance.patch("/api/v1/users/me/profile-image", {
				profileImageUrl: profileUrl,
			});
		} catch (err) {
			console.error(err);
		}
	};

	getKakaoProfile();

	console.log(accessToken);

	return isOnboardingNeeded;
};
