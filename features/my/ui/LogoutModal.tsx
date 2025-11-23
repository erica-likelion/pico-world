import * as S from "@/features/my/style/LogoutModal.styles";
import { Button } from "@/shared/ui";
import Modal from "react-native-modal";

interface LogoutModalProps {
	isVisible: boolean;
	onConfirm: () => void;
	onCancel: () => void;
}

export function LogoutModal({
	isVisible,
	onConfirm,
	onCancel,
}: LogoutModalProps) {
	return (
		<Modal isVisible={isVisible}>
			<S.LogoutModalContainer>
				<S.LogoutTitle>로그아웃</S.LogoutTitle>
				<S.LogoutModalText>로그아웃 하시겠습니까?</S.LogoutModalText>
				<S.ButtonRow>
					<Button color="gray" size="medium" text="취소" onPress={onCancel} />
					<Button color="white" size="medium" text="확인" onPress={onConfirm} />
				</S.ButtonRow>
			</S.LogoutModalContainer>
		</Modal>
	);
}
