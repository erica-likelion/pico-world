import * as S from "@/features/friends/style/FriendDeleteModal.styles";
import { Button } from "@/shared/ui";
import Modal from "react-native-modal";

interface FriendDeleteModalProps {
	isVisible: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	friendName: string;
}

export function FriendDeleteModal({
	isVisible,
	onConfirm,
	onCancel,
	friendName,
}: FriendDeleteModalProps) {
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
				<S.Title>친구 끊기</S.Title>
				<S.DescriptionContainer>
					<S.Description>{friendName} 님과 정말 친구를 끊을까요?</S.Description>
					<S.SubDescription>
						언제든지 다시 친구를 맺을 수 있습니다.
					</S.SubDescription>
				</S.DescriptionContainer>
				<S.ButtonRow>
					<Button color="gray" size="medium" text="취소" onPress={onCancel} />
					<Button
						color="white"
						size="medium"
						text="친구 끊기"
						onPress={onConfirm}
					/>
				</S.ButtonRow>
			</S.Container>
		</Modal>
	);
}
