import { getFeedback } from "@/entities/character/api/feedback";
import { getEmotionRecord } from "@/features/journal/api/emotion";
import { useRecordFlow } from "@/features/record/model/useRecordFlow";
import {
	EmotionCanvas,
	EmotionComplete,
	EmotionWrite,
} from "@/features/record/ui";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { ConfirmModal, Toast } from "@/shared/ui";
import { TopNav } from "@/widgets/TopNav/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect } from "react";

export default function RecordEdit() {
	const {
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
		handleToastHide,
		initializeRecord,
		aiFeedbackCount,
		showConfirmModal,
		handleConfirmFeedback,
		handleCancelFeedback,
	} = useRecordFlow();
	const router = useRouter();
	const params = useLocalSearchParams();
	useHideBottomNav();

	useEffect(() => {
		const id = params.id as string | undefined;
		if (!id) return;

		(async () => {
			const fetched = await getEmotionRecord(id);
			if (!fetched) return;

			const feedbackData = await getFeedback(Number(id));

			const initialData = {
				...fetched,
				ai_feedback_count: feedbackData.attemptsUsed,
			};

			initializeRecord(initialData);
		})();
	}, [params.id, initializeRecord]);

	const handleComplete = useCallback(() => {
		router.push(`/journal/detail?id=${params.id}`);
	}, [router, params.id]);

	if (phase === "explore") {
		return (
			<>
				<TopNav title="기록 수정" leftIcon={true} />
				<EmotionCanvas
					onProceed={handleProceedToWrite}
					initialEmotion={selectedEmotion}
				/>
			</>
		);
	}

	if (phase === "write") {
		return (
			<>
				<TopNav title="기록 수정" leftIcon={true} onLeftPress={handleBack} />
				<EmotionWrite
					selectedEmotion={selectedEmotion}
					text={text}
					setText={setText}
					isFriendOnly={isFriendOnly}
					setIsFriendOnly={setIsFriendOnly}
					isSaving={isSaving}
					OnSave={() => handleSave(params.id as string)}
				/>
				<Toast
					message={toastMessage}
					visible={isToastVisible}
					onHide={handleToastHide}
				/>
				<ConfirmModal
					isVisible={showConfirmModal}
					title={`AI 피드백을 받으시겠습니까? (${aiFeedbackCount}/3)`}
					description="피드백은 최대 3번까지 받을 수 있습니다."
					confirmText="다시 받기"
					cancelText="취소"
					onConfirm={handleConfirmFeedback}
					onCancel={handleCancelFeedback}
				/>
			</>
		);
	}

	if (phase === "complete") {
		return (
			<EmotionComplete
				selectedEmotion={selectedEmotion}
				onComplete={handleComplete}
			/>
		);
	}
}
