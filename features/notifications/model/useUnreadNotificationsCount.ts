import { getNotifications } from "@/features/notifications/api/getNotifications";
import { useQuery } from "@tanstack/react-query";

export const useUnreadNotificationsCount = () => {
	return useQuery({
		queryKey: ["notifications", "unread-count"],
		queryFn: async () => {
			const data = await getNotifications({ pageParam: 0, size: 100 });
			return data.notifications.filter((n) => !n.isRead).length;
		},
		refetchInterval: 60000,
	});
};
