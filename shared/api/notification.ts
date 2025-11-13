import { axiosInstance } from "@/shared/api/axios";

export const sendFcmToken = async (fcmToken: string | null) => {
	return await axiosInstance.post<null>("/api/v1/notifications/token", {
		fcmToken,
	});
};
