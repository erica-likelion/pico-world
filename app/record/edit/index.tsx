import { useUserCharacter } from "@/entities/user/model/userQueries";
import { useRecordFlow } from "@/features/record/model/useRecordFlow";
import {
	EmotionCanvas,
	EmotionComplete,
	EmotionWrite,
} from "@/features/record/ui";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { ConfirmModal, EditCompleteModal, Toast } from "@/shared/ui";
import { TopNav } from "@/widgets/TopNav/ui";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function RecordEdit() {
	const recordFlow = useRecordFlow();
	const router = useRouter();
	const userCharacter = useUserCharacter();
	useHideBottomNav();
	const [isEditCompleteModalVisible, setIsEditCompleteModalVisible] =
		useState(false);
	const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
	// TODO: API에서 오늘 사용한 횟수 받아오기 (하루 3번 제한)
	const [todayCount] = useState(1);

	const handleComplete = () => {
		setIsEditCompleteModalVisible(true);
	};

	const handleBack = () => {
		if (recordFlow.phase === "write") {
			recordFlow.handleBack();
		}
	};

	const handleJustEdit = () => {
		setIsEditCompleteModalVisible(false);
		setIsConfirmModalVisible(true);
	};

	const handleConfirmEdit = () => {
		// TODO: API 호출하여 수정 완료 처리
		setIsConfirmModalVisible(false);
		router.back();
	};

	const handleCancelEdit = () => {
		setIsConfirmModalVisible(false);
	};

	const handleGetNewResponse = () => {
		// TODO: API 호출하여 캐릭터 답변 다시 받기
		setIsEditCompleteModalVisible(false);
		router.back();
	};

	if (recordFlow.phase === "explore") {
		return (
			<>
				<TopNav title="기록 수정" leftIcon={true} />
				<EmotionCanvas onProceed={recordFlow.handleProceedToWrite} />
			</>
		);
	}

	if (recordFlow.phase === "write") {
		return (
			<>
				<TopNav title="기록 수정" leftIcon={true} onLeftPress={handleBack} />
				<EmotionWrite
					selectedEmotion={recordFlow.selectedEmotion}
					text={recordFlow.text}
					setText={recordFlow.setText}
					isFriendOnly={recordFlow.isFriendOnly}
					setIsFriendOnly={recordFlow.setIsFriendOnly}
					isSaving={recordFlow.isSaving}
					OnSave={recordFlow.handleSave}
				/>
				<Toast
					message={recordFlow.toastMessage}
					visible={recordFlow.isToastVisible}
					onHide={recordFlow.handleToastHide}
				/>
			</>
		);
	}

	if (recordFlow.phase === "complete") {
		return (
			<>
				<EmotionComplete
					selectedEmotion={recordFlow.selectedEmotion}
					onComplete={handleComplete}
				/>
				<EditCompleteModal
					isVisible={isEditCompleteModalVisible}
					onJustEdit={handleJustEdit}
					onGetNewResponse={handleGetNewResponse}
					characterName={userCharacter}
					todayCount={todayCount}
				/>
				<ConfirmModal
					isVisible={isConfirmModalVisible}
					title="수정 완료"
					description="기록이 수정되었습니다."
					confirmText="확인"
					cancelText="취소"
					onConfirm={handleConfirmEdit}
					onCancel={handleCancelEdit}
				/>
			</>
		);
	}
}
