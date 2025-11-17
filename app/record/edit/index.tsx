import { useUserCharacter } from "@/entities/user/model/userQueries";
import { getEmotionRecord } from "@/features/journal/api/emotion";
import { useRecordFlow } from "@/features/record/model/useRecordFlow";
import {
	EmotionCanvas,
	EmotionComplete,
	EmotionWrite,
} from "@/features/record/ui";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import type { EmotionChip } from "@/shared/types";
import { ConfirmModal, EditCompleteModal, Toast } from "@/shared/ui";
import { TopNav } from "@/widgets/TopNav/ui";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function RecordEdit() {
	const {
		phase,
		selectedEmotion,
		setSelectedEmotion,
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
	} = useRecordFlow();
	const router = useRouter();
	const params = useLocalSearchParams();
	const userCharacter = useUserCharacter();
	useHideBottomNav();
	const [isEditCompleteModalVisible, setIsEditCompleteModalVisible] =
		useState(false);
	const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
	const [todayCount] = useState(1);

	const handleComplete = () => {
		setIsEditCompleteModalVisible(true);
	};
	useEffect(() => {
		const id = params.id as string | undefined;
		if (!id) return;

		(async () => {
			const fetched = await getEmotionRecord(id);
			if (!fetched) return;

			// construct EmotionChip-like object
			const chip: EmotionChip = {
				label: fetched.emotion_name,
				mainColor: fetched.main_color,
				subColor: fetched.sub_color,
				textColor: fetched.text_color,
			};

			// populate flow
			setSelectedEmotion(chip);
			setText(fetched.record);
			setIsFriendOnly(fetched.is_shared);
		})();
	}, [params.id, setSelectedEmotion, setText, setIsFriendOnly]);

	const handleJustEdit = () => {
		setIsEditCompleteModalVisible(false);
		setIsConfirmModalVisible(true);
	};

	const handleConfirmEdit = async () => {
		// 이미 저장/수정은 OnSave에서 처리하므로 여기서는 모달 닫고 뒤로 이동만 처리
		setIsConfirmModalVisible(false);
		router.push("/journal");
	};

	const handleCancelEdit = () => {
		setIsConfirmModalVisible(false);
		router.push("/journal");
	};

	const handleGetNewResponse = () => {
		// TODO: API 호출하여 캐릭터 답변 다시 받기
		setIsEditCompleteModalVisible(false);
		router.push("/journal");
	};

	if (phase === "explore") {
		return (
			<>
				<TopNav title="기록 수정" leftIcon={true} />
				<EmotionCanvas onProceed={handleProceedToWrite} />
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
			</>
		);
	}

	if (phase === "complete") {
		return (
			<>
				<EmotionComplete
					selectedEmotion={selectedEmotion}
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
