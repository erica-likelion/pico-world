import { postRecord } from "@/features/record/api/PostRecord";
import type { EmotionChip } from "@/shared/types";
import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { useState } from "react";

type Phase = "explore" | "write" | "complete";

interface PostRecordErrorResponse {
	message: string;
}

const ERROR_MESSAGES: Record<number, string> = {
	400: "잘못된 요청입니다.",
	500: "서버 오류가 발생했습니다.",
};

export function useRecordFlow() {
	const [phase, setPhase] = useState<Phase>("explore");
	const [selectedEmotion, setSelectedEmotion] = useState<EmotionChip | null>(
		null,
	);
	const [text, setText] = useState("");
	const [isFriendOnly, setIsFriendOnly] = useState(false);
	const [isToastVisible, setIsToastVisible] = useState(false);
	const [toastMessage, setToastMessage] = useState("");

	const { mutateAsync: postRecordMutate, isPending: isSaving } = useMutation<
		Awaited<ReturnType<typeof postRecord>>,
		AxiosError<PostRecordErrorResponse>,
		Parameters<typeof postRecord>[0]
	>({
		mutationFn: postRecord,
		onSuccess: () => {
			setIsToastVisible(false);
			setPhase("complete");
		},
		onError: (error) => {
			const status = error.response?.status;
			const message =
				(status && ERROR_MESSAGES[status]) || "알 수 없는 오류가 발생했습니다.";

			if (status === 500) {
				setToastMessage(`${message} 다시 시도해주세요.`);
				setIsToastVisible(true);
				return;
			}

			if (status === 400) {
				setToastMessage(message);
				setIsToastVisible(true);
				return;
			}

			setToastMessage("기록 저장 실패");
			setIsToastVisible(true);
		},
	});

	const handleProceedToWrite = (chip: EmotionChip) => {
		setSelectedEmotion(chip);
		setPhase("write");
	};

	const handleSave = async () => {
		if (!selectedEmotion) {
			setToastMessage("감정을 먼저 선택해주세요.");
			setIsToastVisible(true);
			return;
		}

		const label = selectedEmotion.label;

		if (!label) {
			setToastMessage("선택한 감정에 이름이 없습니다.");
			setIsToastVisible(true);
			return;
		}

		const payload = {
			record: text,
			emotion_name: label,
			main_color: selectedEmotion.mainColor,
			sub_color: selectedEmotion.subColor,
			text_color: selectedEmotion.textColor ?? "#FFFFFF",
			is_shared: isFriendOnly,
			ai_feedback_count: 1,
		};

		try {
			await postRecordMutate(payload);
		} catch (error) {
			console.log(error);
		}
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
		isSaving,
		isToastVisible,
		toastMessage,
		handleToastHide: () => setIsToastVisible(false),
	};
}
