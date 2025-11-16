import { useRecordFlow } from "@/features/record/model/useRecordFlow";
import {
	EmotionCanvas,
	EmotionComplete,
	EmotionWrite,
} from "@/features/record/ui";
import { useHideBottomNav } from "@/shared/hooks/useHideBottomNav";
import { Toast } from "@/shared/ui";
import { TopNav } from "@/widgets/TopNav/ui";

export default function Record() {
	const recordFlow = useRecordFlow();
	useHideBottomNav();

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
		return <EmotionComplete selectedEmotion={recordFlow.selectedEmotion} />;
	}
}
