import { useInfiniteQuery } from "@tanstack/react-query";
import { getNotifications } from "../api/getNotifications";

export const useNotifications = (days?: number) => {
	return useInfiniteQuery({
		queryKey: ["notifications", days],
		queryFn: ({ pageParam }) => getNotifications({ pageParam, days }),
		getNextPageParam: (lastPage) => {
			return lastPage.hasNext ? lastPage.currentPage + 1 : undefined;
		},
		initialPageParam: 0,
	});
};
