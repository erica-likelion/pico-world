import { getEmotionRecords } from "@/features/home/api/emotion";
import { useAuthStore } from "@/shared/store/auth";
import { useQuery } from "@tanstack/react-query";

export function useHasRecordedToday() {
	const today = new Date().toISOString().split("T")[0];
	const currentMonth = today.slice(0, 7);
	const { isLoggedIn } = useAuthStore();

	const { data: emotionRecords = [] } = useQuery({
		queryKey: ["emotionRecords", currentMonth, today],
		queryFn: () => getEmotionRecords(currentMonth),
		staleTime: 1000 * 60 * 5,
		enabled: !!isLoggedIn,
	});

	return emotionRecords.some((record) => record.created_at.startsWith(today));
}
