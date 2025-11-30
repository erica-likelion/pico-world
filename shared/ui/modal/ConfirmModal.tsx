import * as S from "@/shared/style/ConfirmModal.styles";
import { Button } from "@/shared/ui/Button";
import Modal from "react-native-modal";

interface ConfirmModalProps {
	isVisible: boolean;
	title: string;
	description: string;
	subDescription?: string;
	confirmText?: string;
	cancelText?: string;
	onConfirm: () => void;
	onCancel: () => void;
	onBackdropPress?: () => void;
}

export function ConfirmModal({
	isVisible,
	title,
	description,
	subDescription,
	confirmText = "확인",
	cancelText = "취소",
	onConfirm,
	onCancel,
	onBackdropPress,
}: ConfirmModalProps) {
	return (
		<Modal
			isVisible={isVisible}
			onBackdropPress={onBackdropPress || onCancel}
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
					{subDescription && (
						<S.SubDescription>{subDescription}</S.SubDescription>
					)}
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
