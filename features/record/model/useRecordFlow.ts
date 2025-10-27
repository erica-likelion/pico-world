import { useState } from "react";
import type { EmotionChip } from "./types";

type Phase = "explore" | "write" | "complete";

export function useRecordFlow() {
	const [phase, setPhase] = useState<Phase>("explore");
	const [selectedEmotion, setSelectedEmotion] = useState<EmotionChip | null>(
		null,
	);
	const [text, setText] = useState("");
	const [isFriendOnly, setIsFriendOnly] = useState(false);

	const handleProceedToWrite = (chip: EmotionChip) => {
		setSelectedEmotion(chip);
		setPhase("write");
	};

	const handleSave = async () => {
		console.log({ emotion: selectedEmotion, text, isFriendOnly });
		setPhase("complete");
	};

	const handleBack = () => {
		if (phase === "write") {
			setPhase("explore");
		}
	};

	return {
		phase,
		selectedEmotion,
		text,
		setText,
		isFriendOnly,
		setIsFriendOnly,
		handleProceedToWrite,
		handleSave,
		handleBack,
	};
}
