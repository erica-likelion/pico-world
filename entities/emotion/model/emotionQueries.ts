import { getEmotionRecords } from "@/features/home/api/emotion";
import { useQuery } from "@tanstack/react-query";

export function useHasRecordedToday() {
	const today = new Date().toISOString().split("T")[0];
	const currentMonth = today.slice(0, 7);

	const { data: emotionRecords = [] } = useQuery({
		queryKey: ["emotionRecords", currentMonth],
		queryFn: () => getEmotionRecords(currentMonth),
		staleTime: 1000 * 60 * 5,
	});

	return emotionRecords.some((record) => record.created_at.startsWith(today));
}
