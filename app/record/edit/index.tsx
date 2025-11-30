import { getFeedback } from "@/entities/character/api/feedback";
import { useUserCharacter } from "@/entities/user/model/userQueries";
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
import { useCallback, useEffect, useMemo } from "react";

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
	const userCharacter = useUserCharacter();
	useHideBottomNav();

	const characterDescription = useMemo(() => {
		return `${userCharacter}(이)에게 답변을 다시 받을까요?`;
	}, [userCharacter]);

	useEffect(() => {
		const id = params.id as string | undefined;

		if (!id) return;

		let isCancelled = false;

		(async () => {
			const fetched = await getEmotionRecord(id);

			if (isCancelled) return;

			if (!fetched) return;

			let aiFeedbackCount = 1;
			try {
				const feedbackData = await getFeedback(Number(id));
				aiFeedbackCount = feedbackData.attemptsUsed;
			} catch (error) {}

			if (isCancelled) return;

			const initialData = {
				...fetched,
				ai_feedback_count: aiFeedbackCount,
			};

			initializeRecord(initialData);
		})();

		return () => {
			isCancelled = true;
		};
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
					title={`수정 완료`}
					description={characterDescription}
					subDescription={`오늘 ${aiFeedbackCount}/3`}
					confirmText="답변 다시 받기"
					cancelText="그냥 수정하기"
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
