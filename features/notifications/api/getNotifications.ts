import type { NotificationsResponse } from "@/features/notifications/model/types";
import { axiosInstance } from "@/shared/api/axios";

export const getNotifications = async ({
	pageParam = 0,
	size = 10,
	days,
}: {
	pageParam?: number;
	size?: number;
	days?: number;
}): Promise<NotificationsResponse> => {
	try {
		const response = await axiosInstance.get<NotificationsResponse>(
			"/api/v1/notifications",
			{
				params: {
					page: pageParam,
					size,
					days,
				},
			},
		);
		return response.data;
	} catch (error) {
		console.error("API call failed:", error);
		throw error;
	}
};
