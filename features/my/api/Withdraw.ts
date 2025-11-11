import { axiosInstance } from "@/shared/api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface WithdrawResponse {
	code: number;
	message: string;
	data: null;
}

export const withdraw = async (): Promise<void> => {
	await axiosInstance.delete<WithdrawResponse>("/api/v1/users/me");

	await AsyncStorage.multiRemove(["accessToken", "refreshToken"]);

	return void 0;
};
