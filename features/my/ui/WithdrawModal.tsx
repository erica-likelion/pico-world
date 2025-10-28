import * as S from "@/features/my/style/WithdrawModal.styles";
import { Button } from "@/shared/ui";
import Modal from "react-native-modal";

interface WithdrawProps {
	isVisible: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

export function WithdrawModal({
	isVisible,
	onConfirm,
	onCancel,
}: WithdrawProps) {
	return (
		<Modal isVisible={isVisible}>
			<S.WithdrawModalContainer>
				<S.WithdrawModalText>회원탈퇴 하시겠습니까?</S.WithdrawModalText>
				<S.ButtonRow>
					<Button color="white" size="medium" text="확인" onPress={onConfirm} />
					<Button color="gray" size="medium" text="취소" onPress={onCancel} />
				</S.ButtonRow>
			</S.WithdrawModalContainer>
		</Modal>
	);
}
