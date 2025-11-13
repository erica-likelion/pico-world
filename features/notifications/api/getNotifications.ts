import {
	Notification,
	NotificationsResponse,
} from "@/features/notifications/model/types";
import { axiosInstance } from "@/shared/api/axios";

const allDummyNotifications: Notification[] = Array.from(
	{ length: 25 },
	(_, i) => {
		const type =
			i % 4 === 0
				? "AI_FEEDBACK"
				: i % 4 === 1
					? "FRIEND_REQUEST"
					: i % 4 === 2
						? "FRIEND_ACCEPTED"
						: "FRIEND_EMOTION_RECORD";
		const isFriendType = type.startsWith("FRIEND");
		return {
			notificationId: i + 1,
			type: type,
			title: `${isFriendType ? "친구" : "답장"}`,
			message: `이것은 ${i + 1}번째 더미 알림 메시지입니다.`,
			relatedId: 100 + i,
			isRead: i % 3 === 0,
			readAt: i % 3 === 0 ? new Date().toISOString() : null,
			createdAt: new Date(new Date().getTime() - i * 3600 * 1000).toISOString(),
		};
	},
);

const getDummyNotifications = (
	pageParam: number,
	size: number,
): NotificationsResponse => {
	const start = pageParam * size;
	const end = start + size;
	const pageNotifications = allDummyNotifications.slice(start, end);

	return {
		notifications: pageNotifications,
		currentPage: pageParam,
		totalPages: Math.ceil(allDummyNotifications.length / size),
		totalElements: allDummyNotifications.length,
		hasNext: end < allDummyNotifications.length,
	};
};

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
		// If the response has no notifications on the first page, use dummy data.
		if (pageParam === 0 && response.data.notifications.length === 0) {
			console.log("API returned empty data, using dummy data.");
			return getDummyNotifications(pageParam, size);
		}
		return response.data;
	} catch (error) {
		console.error("API call failed, using dummy data:", error);
		return getDummyNotifications(pageParam, size);
	}
};
