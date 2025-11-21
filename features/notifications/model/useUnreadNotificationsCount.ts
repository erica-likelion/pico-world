import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../api/getNotifications";
import { useAuthStore } from "@/shared/store/auth";

export const useUnreadNotificationsCount = () => {
	const { isLoggedIn } = useAuthStore();

	return useQuery({
		queryKey: ["notifications", "unread-count"],
		queryFn: async () => {
			const data = await getNotifications({ pageParam: 0, size: 20 });
			return data.notifications.filter((n) => !n.isRead).length;
		},
		refetchInterval: 60000, // Refetch every 60 seconds
		enabled: !!isLoggedIn,
	});
};
