import * as S from "@/shared/style/ConfirmModal.styles";
import { Button } from "@/shared/ui";
import Modal from "react-native-modal";

interface ConfirmModalProps {
	isVisible: boolean;
	title: string;
	description: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
}

export function ConfirmModal({
	isVisible,
	title,
	description,
	confirmText = "확인",
	cancelText = "취소",
	onConfirm,
	onCancel,
}: ConfirmModalProps) {
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
				<S.Title>{title}</S.Title>
				<S.DescriptionContainer>
					<S.Description>{description}</S.Description>
				</S.DescriptionContainer>
				<S.ButtonRow>
					<Button
						color="gray"
						size="medium"
						text={cancelText}
						onPress={onCancel}
					/>
					<Button
						color="white"
						size="medium"
						text={confirmText}
						onPress={onConfirm}
					/>
				</S.ButtonRow>
			</S.Container>
		</Modal>
	);
}
