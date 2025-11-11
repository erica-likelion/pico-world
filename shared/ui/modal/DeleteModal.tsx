import * as S from "@/shared/style/DeleteModal.styles";
import { Button } from "@/shared/ui";
import Modal from "react-native-modal";

interface DeleteModalProps {
	isVisible: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	date: string;
}

export default function DeleteModal({
	isVisible,
	onConfirm,
	onCancel,
	date,
}: DeleteModalProps) {
	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onCancel}
			onBackButtonPress={onCancel}
			useNativeDriver
			useNativeDriverForBackdrop
			hideModalContentWhileAnimating
			statusBarTranslucent
			backdropTransitionOutTiming={0}
		>
			<S.Container>
				<S.Title>기록 삭제</S.Title>
				<S.DescriptionContainer>
					<S.Description>{date}</S.Description>
					<S.SubDescription>기록을 삭제할까요?</S.SubDescription>
				</S.DescriptionContainer>
				<S.ButtonRow>
					<Button color="gray" size="medium" text="취소" onPress={onCancel} />
					<Button
						color="white"
						size="medium"
						text="기록 삭제"
						onPress={onConfirm}
					/>
				</S.ButtonRow>
			</S.Container>
		</Modal>
	);
}
