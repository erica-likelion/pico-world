import type { CharacterName } from "@/entities/character/model/characterMessages";
import * as S from "@/shared/style/EditCompleteModal.styles";
import { Button } from "@/shared/ui";
import Modal from "react-native-modal";

interface EditCompleteModalProps {
	isVisible: boolean;
	onJustEdit: () => void;
	onGetNewResponse: () => void;
	characterName: CharacterName;
	todayCount: number; // 오늘 사용한 횟수 (1/3 형식)
}

export function EditCompleteModal({
	isVisible,
	onJustEdit,
	onGetNewResponse,
	characterName,
	todayCount,
}: EditCompleteModalProps) {
	const characterSuffix = characterName === "동동" ? "이가" : "가";
	const characterText = `${characterName}${characterSuffix}`;

	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onJustEdit}
			onBackButtonPress={onJustEdit}
			useNativeDriver
			useNativeDriverForBackdrop
			hideModalContentWhileAnimating
			statusBarTranslucent
			backdropTransitionOutTiming={0}
		>
			<S.Container>
				<S.Title>수정 완료</S.Title>
				<S.DescriptionContainer>
					<S.Description>
						{characterText}에게 답변을 다시 받을까요?
					</S.Description>
					<S.SubDescription>(오늘 {todayCount}/3)</S.SubDescription>
				</S.DescriptionContainer>
				<S.ButtonRow>
					<Button
						color="gray"
						size="medium"
						text="그냥 수정하기"
						onPress={onJustEdit}
					/>
					<Button
						color="white"
						size="medium"
						text="답변 다시 받기"
						onPress={onGetNewResponse}
					/>
				</S.ButtonRow>
			</S.Container>
		</Modal>
	);
}
