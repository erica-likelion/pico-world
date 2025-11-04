import { axiosInstance } from "@/shared/api/axios";
import { ApiResponse } from "@/shared/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface KakaoLoginRequest {
	authorizationCode: string;
	redirectUri: string;
	kakaoAccessToken?: string;
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
	const response: ApiResponse<KakaoLoginResponse> = await axiosInstance.post(
		"/api/v1/auth/kakao/login",
		params,
	);

	const { accessToken, refreshToken, isOnboardingNeeded } = response.data;

	await AsyncStorage.setItem("accessToken", accessToken);
	await AsyncStorage.setItem("refreshToken", refreshToken);

	return isOnboardingNeeded;
};
