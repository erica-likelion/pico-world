import { useToastStore } from "@/shared/store/toast";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

const queryCache = new QueryCache({
	onError: (error: Error) => {
		if (error instanceof AxiosError && error?.response?.status === 404) {
			return;
		}
		useToastStore.getState().show("데이터를 불러오는데 실패했습니다.");
	},
});

export const queryClient = new QueryClient({
	queryCache,
});
