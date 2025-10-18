import { EmotionCanvas } from "@/features/explore/ui/EmotionCanvas";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function Explore() {
	const { hide, show } = useBottomNavStore();

	useFocusEffect(
		useCallback(() => {
			hide();
			return () => {
				show();
			};
		}, [hide, show]),
	);

	return (
		<>
			<TopNav title="감정 기록하기" leftIcon={true} />
			<EmotionCanvas />
		</>
	);
}
