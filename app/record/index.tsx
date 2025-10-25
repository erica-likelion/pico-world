import type { EmotionChip } from "@/features/record/model/useEmotionAnalysis";
import { EmotionCanvas } from "@/features/record/ui/EmotionCanvas";
import { EmotionComplete } from "@/features/record/ui/EmotionComplete";
import { EmotionWrite } from "@/features/record/ui/EmotionWrite";
import { useBottomNavStore } from "@/widgets/BottomNav/model";
import { TopNav } from "@/widgets/TopNav/ui";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";

type Phase = "explore" | "write" | "complete";

export default function Record() {
	const { hide, show } = useBottomNavStore();
	const [phase, setPhase] = useState<Phase>("explore");
	const [selectedEmotion, setSelectedEmotion] = useState<EmotionChip | null>(
		null,
	);
	const [text, setText] = useState("");
	const [isFriendOnly, setIsFriendOnly] = useState(false);

	useFocusEffect(
		useCallback(() => {
			hide();
			return () => {
				show();
			};
		}, [hide, show]),
	);

	const handleProceedToWrite = (chip: EmotionChip) => {
		setSelectedEmotion(chip);
		setPhase("write");
	};

	const handleSave = async () => {
		console.log("저장:", { emotion: selectedEmotion, text, isFriendOnly });
		setPhase("complete");
	};

	if (phase === "explore") {
		return (
			<>
				<TopNav title="감정 기록하기" leftIcon={true} />
				<EmotionCanvas onProceed={handleProceedToWrite} />
			</>
		);
	}

	if (phase === "write") {
		return (
			<>
				<TopNav title="감정 기록하기" leftIcon={true} />
				<EmotionWrite
					selectedEmotion={selectedEmotion}
					setText={setText}
					isFriendOnly={isFriendOnly}
					setIsFriendOnly={setIsFriendOnly}
					OnSave={handleSave}
				/>
			</>
		);
	}

	if (phase === "complete") {
		return (
			<>
				<EmotionComplete selectedEmotion={selectedEmotion} />
			</>
		);
	}
}
