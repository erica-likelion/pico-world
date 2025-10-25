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
		</>
	);
}
