import { updateNickname } from "@/features/my/api/EditName";
import { getUserInfo } from "@/features/my/api/MyInfo";
import { axiosInstance } from "@/shared/api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AppleLoginRequest {
	identity_token: string;
	device?: string;
	pushToken?: string;
}

interface AppleLoginResponse {
	accessToken: string;
	refreshToken: string;
	isOnboardingNeeded: boolean;
	email: string;
}

export const appleLogin = async (
	params: AppleLoginRequest,
): Promise<boolean> => {
	const response = await axiosInstance.post<AppleLoginResponse>(
		"/api/v1/auth/apple/login",
		params,
		{
			headers: { Authorization: "" }, // 로그인 요청엔 기존 토큰 제거
		},
	);
	const { accessToken, refreshToken, isOnboardingNeeded } = response.data;

	await AsyncStorage.setItem("accessToken", accessToken);
	await AsyncStorage.setItem("refreshToken", refreshToken);

	const userEmail = await getUserInfo();
	const defaultEmail = userEmail.email.split("@")[0];

	if (!userEmail.nickname) {
		await updateNickname({ nickname: defaultEmail });
	}

	return isOnboardingNeeded;
};
