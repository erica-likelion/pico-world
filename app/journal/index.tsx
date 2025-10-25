import { TodayHistory } from "@/features/home/ui";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { Text, TouchableOpacity } from "react-native";

export default function Journal() {
	const { show } = useBottomNavStore();
	const router = useRouter();

	useFocusEffect(
		useCallback(() => {
			show();
		}, [show]),
	);

	return (
		<>
			<TopNav title="기록" />
			<TouchableOpacity onPress={() => router.push("/journal/explore")}>
				<Text style={{ color: "white" }}>감정 기록 ㄱㄱ</Text>
			</TouchableOpacity>
			<TodayHistory
				date="2025. 10. 6"
				time="오후 3:45"
				emotionTitle="만족스러운"
				mainColor="#FF685B"
				subColor="#F3E9DA"
				historyText="오늘은 책상 앞에 앉아서 집중도 잘 되고 할 일도 다 하고 전체적으로 만족스러운 하루였따~오늘은 책상 앞에 앉아서 집중도 잘 되고 할 일도 다 하고 전체적으로 만족스러운 하루였따~오늘은 책상 앞에 앉아서 집중도 잘 되고 할 일도 다"
				AIComment="흥, 드디어 사람 구실 좀 했네? 그래, 그런 날이 있어야 균형이 맞지. 너 오늘 꽤 괜찮았어, 인정해줄게."
			/>
		</>
	);
}
