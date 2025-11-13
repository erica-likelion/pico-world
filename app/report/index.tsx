import {
	CharacterMessageBubble,
	MonthlyEmotion,
	PeakEmotionHours,
	TopEmotion,
} from "@/features/report/ui";
import { TopNav } from "@/widgets/TopNav/ui";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";

export default function Report() {
	return (
		<>
			<TopNav title="리포트" />
			<ScrollView>
				<View style={{ width: "100%", paddingHorizontal: 16 }}>
					<CharacterMessageBubble />
					<MonthlyEmotion
						onPress={({ thisMonthEmotion, lastMonthEmotion }) => {
							router.push({
								pathname: "/report/monthly-emotion",
								params: {
									thisMonthEmotion,
									lastMonthEmotion: lastMonthEmotion ?? "",
								},
							});
						}}
					/>
					<TopEmotion
						onPress={(emotions) => {
							const emotionParam = encodeURIComponent(JSON.stringify(emotions));
							router.push({
								pathname: "/report/top-emotion",
								params: {
									emotions: emotionParam,
								},
							});
						}}
					/>
					<PeakEmotionHours />
				</View>
			</ScrollView>
		</>
	);
}
