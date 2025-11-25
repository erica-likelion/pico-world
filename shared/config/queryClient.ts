import { useToastStore } from "@/shared/store/toast";
import { QueryCache, QueryClient } from "@tanstack/react-query";

const queryCache = new QueryCache({
	onError: () => {
		useToastStore.getState().show("데이터를 불러오는데 실패했습니다.");
	},
});

export const queryClient = new QueryClient({
	queryCache,
});
