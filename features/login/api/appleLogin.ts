import { axiosInstance } from "@/shared/api/axios";
import { ApiResponse } from "@/shared/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppleLoginRequest {
	identity_token: string;
	authorization_code: string | null;
	device?: string;
	pushToken?: string;
}

interface AppleLoginResponse {
	accessToken: string;
	refreshToken: string;
	isOnboardingNeeded: boolean;
}

export const appleLogin = async (
	params: AppleLoginRequest,
): Promise<boolean> => {
	const response: ApiResponse<AppleLoginResponse> = await axiosInstance.post(
		"/api/v1/auth/apple/login",
		params,
	);

	const { accessToken, refreshToken, isOnboardingNeeded } = response.data;

	await AsyncStorage.setItem("accessToken", accessToken);
	await AsyncStorage.setItem("refreshToken", refreshToken);

	return isOnboardingNeeded;
};
