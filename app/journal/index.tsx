import { EmotionRecordList } from "@/features/journal/ui";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { View } from "react-native";

export default function Journal() {
	const { show } = useBottomNavStore();

	useFocusEffect(
		useCallback(() => {
			show();
		}, [show]),
	);

	return (
		<View style={{ flex: 1 }}>
			<TopNav title="기록" />
			<EmotionRecordList />
		</View>
	);
}
