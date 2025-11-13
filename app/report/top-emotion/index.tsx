import { TopEmotionChart } from "@/features/report/ui/TopEmotionChart";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import type { EmotionChip } from "@/shared/types";
import { TopNav } from "@/widgets/TopNav/ui";
import { useLocalSearchParams } from "expo-router";
import { useMemo } from "react";

export default function TopEmotionPage() {
	useHideBottomNav();
	const params = useLocalSearchParams<{ emotions: string }>();

	const emotionChip = useMemo(
		() =>
			JSON.parse(decodeURIComponent(params.emotions ?? "[]")) as EmotionChip[],
		[params.emotions],
	);

	return (
		<>
			<TopNav title="제일 많았던 상태" leftIcon={true} />
			<TopEmotionChart emotionChip={emotionChip} />
		</>
	);
}
