import { MonthlyEmotionChart } from "@/features/report/ui";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { TopNav } from "@/widgets/TopNav/ui";
import { useLocalSearchParams } from "expo-router";

export default function MonthlyEmotionPage() {
	useHideBottomNav();
	const params = useLocalSearchParams<{
		thisMonthEmotion: string;
		lastMonthEmotion: string;
	}>();

	const thisMonthEmotion = params.thisMonthEmotion;
	const lastMonthEmotion = params.lastMonthEmotion;

	return (
		<>
			<TopNav title="저번 달과 상태 비교" leftIcon={true} />
			<MonthlyEmotionChart
				thisMonthEmotion={thisMonthEmotion}
				lastMonthEmotion={lastMonthEmotion}
			/>
		</>
	);
}
