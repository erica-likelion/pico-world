import { MonthlyEmotion } from "@/features/report/ui/MonthlyEmotion";
import { PeakEmotionHours } from "@/features/report/ui/PeakEmotionHours";
import { TopEmotion } from "@/features/report/ui/TopEmotion";
import { CharacterBubble } from "@/shared/ui/CharacterBubble";
import { TopNav } from "@/widgets/TopNav/ui";
import { router } from "expo-router";

export default function Report() {
	return (
		<>
			<TopNav title="리포트" />
			<CharacterBubble
				character="츠츠"
				message="3일 연속으로 기록을 남기고 있네? 
이대로만 하자고."
			/>
			<MonthlyEmotion
				mainColor="#ff685b"
				subColor="#f3e9da"
				description="저번 달에 비해 '행복한' 키워드에 가까운 날이 더 많습니다."
				onPress={() => {
					router.push("/report/monthly-emotion");
				}}
			/>
			<TopEmotion
				emotionChip={[
					{
						label: "기쁨",
						mainColor: "#FF685B",
						subColor: "#063FB2",
						count: 15,
					},
					{
						label: "초조",
						mainColor: "#063FB2",
						subColor: "#FF685B",
						count: 8,
					},
					{
						label: "초조",
						mainColor: "#063FB2",
						subColor: "#FF685B",
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
				]}
				onPress={() => {
					router.push("/report/top-emotion");
				}}
			/>
			<PeakEmotionHours description="주로 낮에 만족스러움 상태가 많았어요 " />
		</>
	);
}
