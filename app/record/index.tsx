import { useRecordFlow } from "@/features/record/model/useRecordFlow";
import {
	EmotionCanvas,
	EmotionComplete,
	EmotionWrite,
} from "@/features/record/ui";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function Record() {
	const { hide, show } = useBottomNavStore();
	const recordFlow = useRecordFlow();

	useFocusEffect(
		useCallback(() => {
			hide();
			return () => {
				show();
			};
		}, [hide, show]),
	);

	const handleBack = () => {
		if (recordFlow.phase === "write") {
			recordFlow.handleBack();
		}
	};

	if (recordFlow.phase === "explore") {
		return (
			<>
				<TopNav title="감정 기록하기" leftIcon={true} />
				<EmotionCanvas onProceed={recordFlow.handleProceedToWrite} />
			</>
		);
	}

	if (recordFlow.phase === "write") {
		return (
			<>
				<TopNav
					title="감정 기록하기"
					leftIcon={true}
					onLeftPress={handleBack}
				/>
				<EmotionWrite
					selectedEmotion={recordFlow.selectedEmotion}
					text={recordFlow.text}
					setText={recordFlow.setText}
					isFriendOnly={recordFlow.isFriendOnly}
					setIsFriendOnly={recordFlow.setIsFriendOnly}
					OnSave={recordFlow.handleSave}
				/>
			</>
		);
	}

	if (recordFlow.phase === "complete") {
		return <EmotionComplete selectedEmotion={recordFlow.selectedEmotion} />;
	}
}
