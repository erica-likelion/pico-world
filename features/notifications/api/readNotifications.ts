import { axiosInstance } from "@/shared/api/axios";

export const readNotifications = async (notificationIds: number) => {
	console.log("notificationIds", notificationIds);
	const response = await axiosInstance.put(
		`/api/v1/notifications/${notificationIds}/read`,
	);
	return response.data;
};
