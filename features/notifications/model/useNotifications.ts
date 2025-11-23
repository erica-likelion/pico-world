import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotifications } from "../api/getNotifications";

interface UseNotificationsParams {
	days?: number;
	enabled?: boolean;
}

export const useNotifications = ({
	days,
	enabled,
}: UseNotificationsParams = {}) => {
	return useInfiniteQuery({
		queryKey: ["notifications", days],
		queryFn: ({ pageParam }) => getNotifications({ pageParam, days }),
		getNextPageParam: (lastPage) => {
			return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
		},
		initialPageParam: 0,
		enabled: enabled,
	});
};
