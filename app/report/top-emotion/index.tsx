import { TopEmotionChart } from "@/features/report/ui/TopEmotionChart";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { TopNav } from "@/widgets/TopNav/ui";

export default function TopEmotionPage() {
	useHideBottomNav();

	return (
		<>
			<TopNav title="제일 많았던 상태" leftIcon={true} />
			<TopEmotionChart
				emotionChip={[
					{
						label: "기쁨",
						mainColor: "#FF685B",
						subColor: "#063FB2",
						count: 15,
					},
					{
						label: "근심",
						mainColor: "#063FB2",
						subColor: "#8529D4",
						count: 8,
					},
					{
						label: "무기력",
						mainColor: "#8529D4",
						subColor: "#F3E9DA",
						count: 5,
					},
					{
						label: "초조",
						mainColor: "#063FB2",
						subColor: "#FF685B",
						count: 3,
					},
					{
						label: "초조",
						mainColor: "#063FB2",
						subColor: "#FF685B",
						count: 1,
					},
					{
						label: "초조",
						mainColor: "#063FB2",
						subColor: "#FF685B",
						count: 1,
					},
				]}
			/>
		</>
	);
}
