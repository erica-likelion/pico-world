import { axiosInstance } from "@/shared/api/axios";
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
	const response = await axiosInstance.post<KakaoLoginResponse>(
		"/api/v1/auth/kakao/login",
		params,
		{
			headers: { Authorization: "" }, // 로그인 요청엔 기존 토큰 제거
		},
	);

	const { accessToken, refreshToken, isOnboardingNeeded } = response.data;
	console.log("Kakao login response:", response.data);

	await AsyncStorage.setItem("accessToken", accessToken);
	await AsyncStorage.setItem("refreshToken", refreshToken);

	return isOnboardingNeeded;
};
