import { axiosInstance } from "@/shared/api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const sendFcmToken = async (fcmToken: string | null) => {
	const accessToken = await AsyncStorage.getItem("accessToken");

	if (!accessToken) {
		console.log("Access token not found. Skipping sendFCMToken.");
		return;
	}

	const response = await axiosInstance.post<null>(
		"/api/v1/notifications/token",
		{
			fcmToken,
		},
	);
	console.log(response);
	return;
};
