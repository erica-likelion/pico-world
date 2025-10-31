import { MonthlyEmotionChart } from "@/features/report/ui";
import { TopNav } from "@/widgets/TopNav/ui";

export default function MonthlyEmotionPage() {
	return (
		<>
			<TopNav title="저번 달과 상태 비교" leftIcon={true} />
			<MonthlyEmotionChart thisMonthEmotion="기쁜" lastMonthEmotion="담담한" />
		</>
	);
}
